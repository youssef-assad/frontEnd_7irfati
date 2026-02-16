import React, { useState, useEffect } from "react";
import fr from "../../i18n/locales/fr.json";
import ar from "../../i18n/locales/ar.json";

export default function Home() {
  // 1️⃣ language from localStorage or default
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "fr"
  );

  // 2️⃣ define translations
  const translations = { fr, ar };
  const t = translations[language];

  // 3️⃣ define isRTL based on language
  const isRTL = language === "ar";

  // 4️⃣ useEffect to set document direction
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  return (
    <div>
      <h1>{t.welcome}</h1>
      <div>
        <button onClick={() => {
          setLanguage("fr");
          localStorage.setItem("language", "fr");
        }}>FR</button>
        <button onClick={() => {
          setLanguage("ar");
          localStorage.setItem("language", "ar");
        }}>AR</button>
      </div>
    </div>
  );
}
