// src/hooks/useLangRoute.js
//
// Small helper for the mirrored "/" (English) and "/fr" (French) route
// trees. Lets components:
//   - read the language implied by the current URL
//   - build a same-language link to another page (`buildPath("/careers")`)
//   - switch language while staying on the equivalent page
//
import { useLocation, useNavigate } from "react-router-dom";

export const FR_PREFIX = "/fr";

/** "fr" if the given pathname lives under /fr, otherwise "en". */
export function getLangFromPath(pathname) {
  return pathname === FR_PREFIX || pathname.startsWith(`${FR_PREFIX}/`)
    ? "fr"
    : "en";
}

/** Strips the /fr prefix, returning the canonical (English) path. */
export function stripLangPrefix(pathname) {
  if (pathname === FR_PREFIX) return "/";
  if (pathname.startsWith(`${FR_PREFIX}/`)) return pathname.slice(FR_PREFIX.length) || "/";
  return pathname;
}

/** Adds the /fr prefix to a canonical path when lang === "fr". */
export function withLangPrefix(pathname, lang) {
  const base = stripLangPrefix(pathname);
  if (lang !== "fr") return base;
  return base === "/" ? FR_PREFIX : `${FR_PREFIX}${base}`;
}

export default function useLangRoute() {
  const location = useLocation();
  const navigate = useNavigate();
  const lang = getLangFromPath(location.pathname);

  // Build a path to `canonicalPath` (e.g. "/careers") in the *current* language.
  const buildPath = (canonicalPath) => withLangPrefix(canonicalPath, lang);

  // Navigate to the equivalent page in `targetLang`, preserving the current page.
  const switchLang = (targetLang) => {
    if (targetLang === lang) return;
    const newPath = withLangPrefix(location.pathname, targetLang);
    navigate(`${newPath}${location.search}${location.hash}`);
  };

  return { lang, buildPath, switchLang };
}
