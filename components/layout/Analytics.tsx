import Script from "next/script";
import { site } from "@/content/site";

/**
 * Google Analytics 4 or Google Tag Manager — loads only when an ID is set in
 * /content/site.ts → analytics. Loaded after the page is interactive, never
 * render-blocking. Google Consent Mode defaults are set first so a cookie
 * banner (e.g. Cookiebot, CookieYes via GTM) can update consent later.
 */
export function Analytics() {
  const { ga4Id, gtmId, consentDefault } = site.analytics;
  if (!ga4Id && !gtmId) return null;

  const consent = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'${consentDefault}',ad_user_data:'${consentDefault}',ad_personalization:'${consentDefault}',analytics_storage:'${consentDefault}',wait_for_update:500});`;

  if (gtmId) {
    return (
      <Script id="gtm" strategy="afterInteractive">
        {`${consent}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
      </Script>
    );
  }

  return (
    <>
      <Script id="ga-consent" strategy="afterInteractive">
        {`${consent}gtag('js',new Date());gtag('config','${ga4Id}');`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`} strategy="afterInteractive" />
    </>
  );
}
