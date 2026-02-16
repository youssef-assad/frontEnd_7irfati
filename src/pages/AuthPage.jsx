import { useEffect, useState } from "react";
import "../Auth.css";
import LoginForm from "../features/auth/Login";
import RegisterForm from "../features/auth/Register";
import { useLocation } from "react-router-dom";

export default function AuthPage(status) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("login");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h1 className="auth-title">Bienvenue au 7irfati.ma</h1>
        <p className="auth-subtitle">La plateforme des artisans au Maroc</p>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={`tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Connexion
          </button>
          <button
            className={`tab-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Inscription
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
