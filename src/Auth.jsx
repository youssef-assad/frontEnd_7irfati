import { useState } from "react";
import "./Auth.css";

const VILLES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Safi", "El Jadida",
  "Nador", "Mohammedia", "Béni Mellal",
];

const METIERS = [
  "Électricien", "Plombier", "Peintre", "Maçon", "Menuisier",
  "Carreleur", "Climatisation", "Serrurier", "Jardinier", "Autres",
];

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");
  const [role, setRole] = useState("client");

  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [registerData, setRegisterData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    ville: "",
    metier: "",
  });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    console.log("Login:", loginData);
    alert("Connexion réussie !");
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    console.log("Register:", { ...registerData, role });
    alert("Inscription réussie !");
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        {/* Titre */}
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

        {/* LOGIN */}
        {activeTab === "login" && (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="exemple@email.com"
                value={loginData.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Votre mot de passe"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button type="submit" className="btn-submit">
              Se connecter
            </button>
            <div className="switch-link">
              Pas encore de compte ?{" "}
              <button type="button" onClick={() => setActiveTab("register")}>
                S'inscrire
              </button>
            </div>
          </form>
        )}

        {/* REGISTER */}
        {activeTab === "register" && (
          <form onSubmit={handleRegisterSubmit}>
            {/* Toggle Artisan / Client */}
            <div className="toggle-group">
              <button
                type="button"
                className={`toggle-btn ${role === "client" ? "active" : ""}`}
                onClick={() => setRole("client")}
              >
                Client
              </button>
              <button
                type="button"
                className={`toggle-btn ${role === "artisan" ? "active" : ""}`}
                onClick={() => setRole("artisan")}
              >
                Artisan
              </button>
            </div>

            {/* Prénom + Nom */}
            <div className="form-row">
              <div className="form-group">
                <label>Prénom</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="Prénom"
                  value={registerData.firstname}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Nom</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Nom"
                  value={registerData.lastname}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
            </div>

            {/* Téléphone */}
            <div className="form-group">
              <label>Téléphone</label>
              <input
                type="tel"
                name="phone"
                placeholder="0612345678"
                value={registerData.phone}
                onChange={handleRegisterChange}
                required
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="exemple@email.com"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
              />
            </div>

            {/* Mot de passe */}
            <div className="form-group">
              <label>Mot de passe</label>
              <input
                type="password"
                name="password"
                placeholder="Minimum 6 caractères"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
              />
            </div>

            {/* Champs artisan uniquement */}
            {role === "artisan" && (
              <>
                <div className="form-group">
                  <label>Ville</label>
                  <select
                    name="ville"
                    value={registerData.ville}
                    onChange={handleRegisterChange}
                    required
                  >
                    <option value="">-- Choisir une ville --</option>
                    {VILLES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Métier</label>
                  <select
                    name="metier"
                    value={registerData.metier}
                    onChange={handleRegisterChange}
                    required
                  >
                    <option value="">-- Choisir un métier --</option>
                    {METIERS.map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>
              </>
            )}

            <button type="submit" className="btn-submit">
              S'inscrire
            </button>
            <div className="switch-link">
              Déjà un compte ?{" "}
              <button type="button" onClick={() => setActiveTab("login")}>
                Se connecter
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}