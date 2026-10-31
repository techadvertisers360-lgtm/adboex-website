"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { animations } from "@/content/animations";
import { globe as G } from "@/content/globe";
import type { Office } from "@/content/presence";

/**
 * 3D network globe (three.js via @react-three/fiber). Loaded only when the
 * section is near the viewport (see GlobeLazy).
 *  - grey shaded earth with near-black continents (equirectangular land mask)
 *  - outer shell of glowing nodes linked to their nearest neighbours (one
 *    Points + one LineSegments draw call), dimmer on the far side
 *  - earth and shell rotate west → east; the shell slightly faster (parallax)
 *  - nodes twinkle, light pulses run along a few lines
 *  - green pulsing office markers and blue arcs ride on the earth
 *  - drag left/right to spin; the view eases back afterwards
 *  - renders nothing while the section is off-screen
 * Colours, node count and layout: /content/globe.ts. Speed: animations.globeSpeed.
 */

const D = Math.PI / 180;
const CAMERA_Z = 4.35;
const FOV = 35;

/** lat/lng → point on a sphere, matching three's SphereGeometry UV layout */
function latLng(lat: number, lng: number, r = 1) {
  const phi = (lng + 180) * D;
  const th = lat * D;
  return new THREE.Vector3(-Math.cos(phi) * Math.cos(th) * r, Math.sin(th) * r, Math.sin(phi) * Math.cos(th) * r);
}

/** small deterministic random generator (same network on every load) */
function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** world size → pixels at distance 1 (for point sizes) */
const pixelScale = (state: { size: { height: number }; gl: THREE.WebGLRenderer }) =>
  (state.size.height * state.gl.getPixelRatio()) / (2 * Math.tan((FOV * D) / 2));

const startRotation = Math.PI / 2 - (G.startLng + 180) * D;
const spin = animations.globeSpeed > 0 ? (2 * Math.PI) / animations.globeSpeed : 0; // rad / s

/* ------------------------------------------------------------------ earth */

const earthVert = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vUv = uv;
    vN = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const earthFrag = /* glsl */ `
  uniform sampler2D uLandTex;
  uniform vec3 uOceanLight;
  uniform vec3 uOceanDark;
  uniform vec3 uLand;
  varying vec2 vUv;
  varying vec3 vN;
  void main() {
    vec3 n = normalize(vN);
    float light = clamp(dot(n, normalize(vec3(-0.55, 0.35, 0.78))), 0.0, 1.0);
    float rim = 1.0 - clamp(n.z, 0.0, 1.0);
    vec3 ocean = mix(uOceanDark, uOceanLight, pow(light, 1.35));
    ocean *= 1.0 - 0.45 * pow(rim, 2.2);
    float land = texture2D(uLandTex, vUv).a;
    gl_FragColor = vec4(mix(ocean, uLand, land), 1.0);
    #include <colorspace_fragment>
  }
`;

function Earth() {
  const tex = useLoader(THREE.TextureLoader, "/images/globe/earth-land.png");
  const gl = useThree((s) => s.gl);
  const uniforms = useMemo(() => {
    tex.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy());
    return {
      uLandTex: { value: tex },
      uOceanLight: { value: new THREE.Color(G.oceanLight) },
      uOceanDark: { value: new THREE.Color(G.oceanDark) },
      uLand: { value: new THREE.Color(G.land) },
    };
  }, [tex, gl]);
  return (
    <mesh>
      <sphereGeometry args={[1, 96, 96]} />
      <shaderMaterial vertexShader={earthVert} fragmentShader={earthFrag} uniforms={uniforms} />
    </mesh>
  );
}

/* ---------------------------------------------------------- network shell */

const nodeVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aBright;
  uniform float uTime;
  uniform float uPixel;
  uniform float uBack;
  varying float vAlpha;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vec3 dir = normalize((modelViewMatrix * vec4(position, 0.0)).xyz);
    float depth = mix(uBack, 1.0, smoothstep(-0.35, 0.35, dir.z));
    float twinkle = 0.65 + 0.35 * sin(uTime * (0.6 + aPhase) + aPhase * 6.2831);
    vAlpha = depth * aBright * twinkle;
    gl_PointSize = aSize * uPixel / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const nodeFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float halo = 1.0 - smoothstep(0.0, 0.5, d);
    float core = 1.0 - smoothstep(0.0, 0.16, d);
    gl_FragColor = vec4(uColor, (halo * 0.45 + core) * vAlpha);
    #include <colorspace_fragment>
  }
`;
const lineVert = /* glsl */ `
  attribute float aT;
  attribute float aOpacity;
  attribute float aSeed;
  uniform float uBack;
  varying float vT;
  varying float vOp;
  varying float vSeed;
  varying float vDepth;
  void main() {
    vec3 dir = normalize((modelViewMatrix * vec4(position, 0.0)).xyz);
    vDepth = mix(uBack, 1.0, smoothstep(-0.35, 0.35, dir.z));
    vT = aT;
    vOp = aOpacity;
    vSeed = aSeed;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const lineFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uPulseShare;
  varying float vT;
  varying float vOp;
  varying float vSeed;
  varying float vDepth;
  void main() {
    float pulse = 0.0;
    if (vSeed < uPulseShare) {
      float cycle = fract(uTime * 0.12 + vSeed * 53.0);
      if (cycle < 0.35) {
        float head = cycle / 0.35;
        pulse = exp(-pow((vT - head) * 9.0, 2.0));
      }
    }
    gl_FragColor = vec4(uColor, (vOp + pulse * 0.9) * vDepth);
    #include <colorspace_fragment>
  }
`;

function buildNetwork(count: number) {
  const rand = mulberry32(G.seed);
  const R = G.shellScale;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i < count; i++) {
    const y = 1 - ((i + 0.5) / count) * 2;
    const r = Math.sqrt(1 - y * y);
    const a = i * golden;
    const v = new THREE.Vector3(Math.cos(a) * r, y, Math.sin(a) * r);
    // slight jitter, then back onto the shell
    v.x += (rand() - 0.5) * 0.06;
    v.y += (rand() - 0.5) * 0.06;
    v.z += (rand() - 0.5) * 0.06;
    pts.push(v.normalize().multiplyScalar(R));
  }

  // hubs: the node closest to each configured lat/lng
  const hubIdx = new Set(
    G.hubs.map(([lat, lng]) => {
      const target = latLng(lat, lng, R);
      let best = 0;
      let bestD = Infinity;
      pts.forEach((p, i) => {
        const d = p.distanceToSquared(target);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      return best;
    })
  );

  // links: each node → its 3–5 nearest neighbours (hubs: 9), no duplicates
  const seen = new Set<string>();
  const links: [number, number, number][] = []; // a, b, opacity
  pts.forEach((p, i) => {
    const hub = hubIdx.has(i);
    const k = hub ? 9 : G.neighbours[0] + Math.floor(rand() * (G.neighbours[1] - G.neighbours[0] + 1));
    const near = pts
      .map((q, j) => [j, p.distanceToSquared(q)] as const)
      .filter(([j]) => j !== i)
      .sort((x, y) => x[1] - y[1])
      .slice(0, k);
    for (const [j] of near) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (seen.has(key)) continue;
      seen.add(key);
      const op = hub || hubIdx.has(j) ? 0.5 : G.lineOpacity[0] + rand() * (G.lineOpacity[1] - G.lineOpacity[0]);
      links.push([i, j, op]);
    }
  });

  // node attributes
  const pos = new Float32Array(count * 3);
  const size = new Float32Array(count);
  const phase = new Float32Array(count);
  const bright = new Float32Array(count);
  pts.forEach((p, i) => {
    pos.set([p.x, p.y, p.z], i * 3);
    const hub = hubIdx.has(i);
    size[i] = hub ? 0.075 : 0.032 + rand() * 0.026;
    phase[i] = rand();
    bright[i] = hub ? 1.6 : 0.6 + rand() * 0.5;
  });

  // line attributes (2 vertices per link)
  const lpos = new Float32Array(links.length * 6);
  const lt = new Float32Array(links.length * 2);
  const lop = new Float32Array(links.length * 2);
  const lseed = new Float32Array(links.length * 2);
  links.forEach(([a, b, op], i) => {
    lpos.set([pts[a].x, pts[a].y, pts[a].z, pts[b].x, pts[b].y, pts[b].z], i * 6);
    lt.set([0, 1], i * 2);
    lop.set([op, op], i * 2);
    const s = rand();
    lseed.set([s, s], i * 2);
  });

  const nodes = new THREE.BufferGeometry();
  nodes.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  nodes.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
  nodes.setAttribute("aPhase", new THREE.BufferAttribute(phase, 1));
  nodes.setAttribute("aBright", new THREE.BufferAttribute(bright, 1));

  const lines = new THREE.BufferGeometry();
  lines.setAttribute("position", new THREE.BufferAttribute(lpos, 3));
  lines.setAttribute("aT", new THREE.BufferAttribute(lt, 1));
  lines.setAttribute("aOpacity", new THREE.BufferAttribute(lop, 1));
  lines.setAttribute("aSeed", new THREE.BufferAttribute(lseed, 1));

  return { nodes, lines };
}

function Network({ count }: { count: number }) {
  const { nodes, lines } = useMemo(() => buildNetwork(count), [count]);
  const nodeMat = useRef<THREE.ShaderMaterial>(null);
  const lineMat = useRef<THREE.ShaderMaterial>(null);
  const nodeUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uPixel: { value: 1 }, uBack: { value: G.backFade }, uColor: { value: new THREE.Color(G.node) } }),
    []
  );
  const lineUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uBack: { value: G.backFade }, uPulseShare: { value: G.pulses }, uColor: { value: new THREE.Color(G.line) } }),
    []
  );

  useEffect(
    () => () => {
      nodes.dispose();
      lines.dispose();
    },
    [nodes, lines]
  );

  // write to the material's own uniforms (r3f may hold a copy of the objects above)
  useFrame((state, dt) => {
    const n = nodeMat.current;
    const l = lineMat.current;
    if (!n || !l) return;
    n.uniforms.uTime.value += Math.min(dt, 0.05);
    n.uniforms.uPixel.value = pixelScale(state);
    l.uniforms.uTime.value = n.uniforms.uTime.value;
  });

  return (
    <>
      <lineSegments geometry={lines}>
        <shaderMaterial ref={lineMat} vertexShader={lineVert} fragmentShader={lineFrag} uniforms={lineUniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </lineSegments>
      <points geometry={nodes}>
        <shaderMaterial ref={nodeMat} vertexShader={nodeVert} fragmentShader={nodeFrag} uniforms={nodeUniforms} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </points>
    </>
  );
}

/* --------------------------------------------------- offices: markers + arcs */

const markerVert = /* glsl */ `
  attribute float aPhase;
  uniform float uTime;
  uniform float uPixel;
  varying float vPulse;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vPulse = fract(uTime * 0.6 + aPhase);
    gl_PointSize = 0.22 * uPixel / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;
const markerFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vPulse;
  void main() {
    float d = length(gl_PointCoord - 0.5) * 2.0;
    float core = 1.0 - smoothstep(0.16, 0.24, d);
    float glow = (1.0 - smoothstep(0.0, 0.6, d)) * 0.55;
    float ring = (1.0 - smoothstep(0.0, 0.07, abs(d - vPulse))) * (1.0 - vPulse);
    gl_FragColor = vec4(uColor, core + glow + ring * 0.9);
    #include <colorspace_fragment>
  }
`;

function Offices({ offices, arcs }: { offices: Office[]; arcs: [number, number][] }) {
  const markerMat = useRef<THREE.ShaderMaterial>(null);
  const markers = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(offices.flatMap((o) => latLng(o.lat, o.lng, 1.012).toArray())), 3));
    g.setAttribute("aPhase", new THREE.BufferAttribute(new Float32Array(offices.map((_, i) => i * 0.37)), 1));
    return g;
  }, [offices]);
  const uniforms = useMemo(() => ({ uTime: { value: 0 }, uPixel: { value: 1 }, uColor: { value: new THREE.Color(G.marker) } }), []);
  useEffect(() => () => markers.dispose(), [markers]);

  // arcs: great-circle path lifted off the surface
  const paths = useMemo(
    () =>
      arcs
        .filter(([a, b]) => offices[a] && offices[b])
        .map(([a, b]) => {
          const va = latLng(offices[a].lat, offices[a].lng).normalize();
          const vb = latLng(offices[b].lat, offices[b].lng).normalize();
          const angle = va.angleTo(vb);
          const pts: THREE.Vector3[] = [];
          for (let i = 0; i <= 64; i++) {
            const t = i / 64;
            const v = va.clone().lerp(vb, t).normalize(); // fine for < 180°
            pts.push(v.multiplyScalar(1.006 + Math.sin(Math.PI * t) * (0.02 + angle * 0.07)));
          }
          let len = 0;
          for (let i = 1; i < pts.length; i++) len += pts[i].distanceTo(pts[i - 1]);
          return { pts, len };
        }),
    [offices, arcs]
  );
  const lineRefs = useRef<({ material: { dashOffset: number } } | null)[]>([]);

  useFrame((state, dt) => {
    const m = markerMat.current;
    if (!m) return;
    m.uniforms.uTime.value += Math.min(dt, 0.05);
    m.uniforms.uPixel.value = pixelScale(state);
    const t = m.uniforms.uTime.value;
    // each arc draws in, holds, then restarts (staggered)
    paths.forEach((p, i) => {
      const line = lineRefs.current[i];
      if (!line) return;
      const local = (t - i * 1.1) % 10;
      const k = local < 0 ? 0 : Math.min(1, local / 1.6);
      line.material.dashOffset = p.len * (1 - k);
    });
  });

  return (
    <>
      {paths.map((p, i) => (
        <Line
          key={i}
          ref={(el) => {
            lineRefs.current[i] = el as unknown as { material: { dashOffset: number } } | null;
          }}
          points={p.pts}
          color={G.arc}
          lineWidth={2}
          dashed
          dashSize={p.len}
          gapSize={p.len}
          dashOffset={p.len}
          transparent
          opacity={0.95}
        />
      ))}
      <points geometry={markers}>
        <shaderMaterial ref={markerMat} vertexShader={markerVert} fragmentShader={markerFrag} uniforms={uniforms} transparent depthWrite={false} />
      </points>
    </>
  );
}

/* ------------------------------------------------------------------ scene */

function Scene({ offices, arcs, count, onReady }: { offices: Office[]; arcs: [number, number][]; count: number; onReady: () => void }) {
  const earth = useRef<THREE.Group>(null);
  const shell = useRef<THREE.Group>(null);
  const controls = useRef<React.ComponentRef<typeof OrbitControls>>(null);
  const dragging = useRef(false);
  const ready = useRef(false);
  const gl = useThree((s) => s.gl);
  const home = useMemo(() => new THREE.Vector3(0, 0, CAMERA_Z), []);

  useEffect(() => {
    // let the page scroll vertically on touch screens; only horizontal drags spin the globe
    gl.domElement.style.touchAction = "pan-y";
  });

  useFrame(({ camera }, dt) => {
    const step = Math.min(dt, 0.05) * spin;
    if (earth.current) earth.current.rotation.y += step;
    if (shell.current) shell.current.rotation.y += step * G.shellSpeedFactor;
    if (!dragging.current && controls.current) {
      camera.position.lerp(home, 0.025); // ease back to the front view
      controls.current.update();
    }
    if (!ready.current) {
      ready.current = true;
      onReady();
    }
  });

  return (
    <>
      <group rotation={[G.tilt, 0, 0]}>
        <group ref={earth} rotation={[0, startRotation, 0]}>
          <Earth />
          <Offices offices={offices} arcs={arcs} />
        </group>
        <group ref={shell} rotation={[0, startRotation, 0]}>
          <Network count={count} />
        </group>
      </group>
      <OrbitControls
        ref={controls}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={0.55}
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
        onStart={() => (dragging.current = true)}
        onEnd={() => (dragging.current = false)}
      />
    </>
  );
}

export default function GlobeNetwork({ offices, arcs, onReady }: { offices: Office[]; arcs: [number, number][]; onReady: () => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(G.nodeCount);

  useEffect(() => {
    const lowEnd = window.matchMedia("(max-width: 767px)").matches || (navigator.hardwareConcurrency ?? 8) <= 2;
    if (lowEnd) setCount(G.mobileNodeCount);
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} aria-hidden="true" className="absolute inset-0 cursor-grab active:cursor-grabbing">
      <Canvas
        dpr={[1, 2]}
        frameloop={visible ? "always" : "never"}
        camera={{ position: [0, 0, CAMERA_Z], fov: FOV, near: 0.1, far: 20 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          <Scene offices={offices} arcs={arcs} count={count} onReady={onReady} />
        </Suspense>
      </Canvas>
    </div>
  );
}
