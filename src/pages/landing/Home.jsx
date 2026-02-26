
import { useLanguage } from "../../context/LanguageContext";
export default function Home() {
  // 1️⃣ language from localStorage or default


 const { t, setLanguage } = useLanguage();
  


  return (
    <div>
      <h1>{t.home}</h1>
     <p>
      {t.message}
     </p>
    </div>
  );
}
