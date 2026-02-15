import { useState } from "react";

const VILLES = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger", "Agadir",
  "Meknès", "Oujda", "Kénitra", "Tétouan", "Safi", "El Jadida",
  "Nador", "Mohammedia", "Béni Mellal",
];

const METIERS = [
  "Électricien", "Plombier", "Peintre", "Maçon", "Menuisier",
  "Carreleur", "Climatisation", "Serrurier", "Jardinier", "Autres",
];

export default function RegisterForm({ onSwitchToLogin }) {
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    ville: "",
    metier: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build the payload depending on role
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: role.toUpperCase(), // "CLIENT" or "ARTISAN"
      ...(role === "artisan" && {
        ville: formData.ville,
        metier: formData.metier,
      }),
    };

    try {
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Erreur lors de l'inscription");
        return;
      }

      setSuccess(true);
      setTimeout(() => {
        onSwitchToLogin(); // redirect to login tab after 2 seconds
      }, 2000);

    } catch (err) {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="form-success">
        <p>✅ Inscription réussie ! Redirection vers la connexion...</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

      {/* Toggle Client / Artisan */}
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
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="lastname"
            placeholder="Nom"
            value={formData.lastname}
            onChange={handleChange}
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
          value={formData.phone}
          onChange={handleChange}
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
          value={formData.email}
          onChange={handleChange}
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
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />
      </div>

      {/* Artisan only fields */}
      {role === "artisan" && (
        <>
          <div className="form-group">
            <label>Ville</label>
            <select
              name="ville"
              value={formData.ville}
              onChange={handleChange}
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
              value={formData.metier}
              onChange={handleChange}
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

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </button>

      <div className="switch-link">
        Déjà un compte ?{" "}
        <button type="button" onClick={onSwitchToLogin}>
          Se connecter
        </button>
      </div>
    </form>
  );
}