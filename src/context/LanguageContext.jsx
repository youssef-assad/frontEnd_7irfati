// src/context/LanguageContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import fr from "../i18n/locales/fr.json";
import ar from "../i18n/locales/ar.json";

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "fr"
  );

  const translations = { fr, ar };
  const t = translations[language];
  const isRTL = language === "ar";

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [language, isRTL]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);