import { useState } from "react";
import "../Auth.css";
import LoginForm from "../features/auth/Login";
import RegisterForm from "../features/auth/Register";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

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
        {activeTab === "login" ? (
          <LoginForm onSwitchToRegister={() => setActiveTab("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setActiveTab("login")} />
        )}
      </div>
    </div>
  );
}