// src/components/Seo.jsx
//
// Per-route <title>/meta description + hreflang alternates.
// English pages stay unprefixed ("/", "/careers") to preserve existing
// SEO/indexing; French mirrors live under "/fr". x-default points at English.
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { stripLangPrefix } from "../hooks/useLangRoute";

const SITE_URL = "https://www.rightclickpro.ca";

export default function Seo({ titleKey, descriptionKey }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const canonicalPath = stripLangPrefix(location.pathname); // "/" or "/careers"
  const enSuffix = canonicalPath === "/" ? "" : canonicalPath;
  const enUrl = `${SITE_URL}${canonicalPath}`;
  const frUrl = `${SITE_URL}/fr${enSuffix}`;
  const currentUrl = i18n.language === "fr" ? frUrl : enUrl;

  const title = t(titleKey);
  const description = t(descriptionKey);

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={currentUrl} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="fr" href={frUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={currentUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
