// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en.json";
import fr from "./locales/fr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fr: { translation: fr },
  },
  lng: "en",
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  interpolation: {
    escapeValue: false, // React already escapes output
  },
  // We derive the active language from the URL (see useLangRoute /
  // App.jsx's LangSync), not from browser detection — this keeps the
  // unprefixed "/" and "/careers" routes reliably serving English.
  detection: undefined,
});

export default i18n;
