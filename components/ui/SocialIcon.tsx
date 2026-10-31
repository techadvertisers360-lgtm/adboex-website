/** Brand icons for social links (decorative — the link carries the aria-label). */
const paths: Record<string, React.ReactNode> = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </>
  ),
  facebook: (
    <path
      fill="currentColor"
      d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z"
    />
  ),
  youtube: (
    <path
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      d="M6.9 8.8H3.6V20h3.3V8.8ZM5.2 3.5a1.9 1.9 0 1 0 0 3.8 1.9 1.9 0 0 0 0-3.8ZM20.4 13.6c0-3-1.6-5-4.3-5-1.5 0-2.5.8-2.9 1.6V8.8H10V20h3.3v-5.6c0-1.5.3-2.9 2.1-2.9 1.8 0 1.8 1.7 1.8 3V20h3.3v-6.4Z"
    />
  ),
  tiktok: (
    <path
      fill="currentColor"
      d="M16.6 3h-3.1v12.1a2.7 2.7 0 1 1-2.7-2.7c.3 0 .5 0 .8.1V9.3a5.9 5.9 0 1 0 5 5.8V9a7.6 7.6 0 0 0 4.4 1.4V7.3A4.4 4.4 0 0 1 16.6 3Z"
    />
  ),
};

export function SocialIcon({ name, className = "size-[18px]" }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={className}>
      {paths[name]}
    </svg>
  );
}
