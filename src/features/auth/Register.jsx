import { useState, useEffect } from "react";
import { fetchRegisterData } from "../../api/lookupApi";
import { useTranslation } from "react-i18next";

export default function RegisterForm({ onSwitchToLogin }) {
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { i18n } = useTranslation();

  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingLookup, setLoadingLookup] = useState(true);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    password: "",
    cityId: "",
    categoryId: "",
  });

  // Load cities & categories from API
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        const data = await fetchRegisterData();
        if (!ignore) {
          setCities(data.cities);
          setCategories(data.categories);
        }
      } catch (err) {
        console.error("Lookup loading failed", err);
        setError("Impossible de charger les villes et métiers");
      } finally {
        setLoadingLookup(false);
      }
    }

    load();
    return () => { ignore = true; };
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build payload for backend
    const payload = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      phone: formData.phone,
      email: formData.email,
      password: formData.password,
      role: role.toUpperCase(), // "CLIENT" or "ARTISAN"
      ...(role === "artisan" && {
        cityId: Number(formData.cityId),
        categoryId: Number(formData.categoryId),
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
        onSwitchToLogin();
      }, 2000);
    } catch {
      setError("Erreur de connexion au serveur");
    } finally {
      setLoading(false);
    }
  };

  if (loadingLookup) {
    return <p>Chargement des villes et métiers...</p>;
  }

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

      {/* Name fields */}
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

      {/* Phone */}
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

      {/* Password */}
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

      {/* Artisan only */}
      {role === "artisan" && (
        <>
          <div className="form-group">
            <label>Ville</label>
            <select
              name="cityId"
              value={formData.cityId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir une ville --</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {i18n.language === "ar" ? city.nameAr : city.nameFr}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Métier</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
            >
              <option value="">-- Choisir un métier --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {i18n.language === "ar" ? cat.nameAr : cat.nameFr}
                </option>
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
