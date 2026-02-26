import { useEffect, useState } from "react";
import "../Auth.css";
import LoginForm from "../features/auth/Login";
import RegisterForm from "../features/auth/Register";
import { useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

export default function AuthPage(props) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");
  const { t } = useLanguage();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">{t.auth.title}</h1>
        <p className="auth-subtitle">{t.auth.subtitle}</p>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
           {t.auth.login}
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
             {t.auth.register}
          </button>
        </div>

        {/* Render the right form */}
        {activeTab === "login"
          ? <LoginForm onSwitchToRegister={() => setActiveTab("register")} />
          : <RegisterForm onSwitchToLogin={() => setActiveTab("login")} />
        }

      </div>
    </div>
  );
}
