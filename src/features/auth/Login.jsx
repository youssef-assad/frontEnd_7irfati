import { useState } from "react";
import { loginUser } from "./AuthApi";


export default function LoginForm({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError(null);

  try {
    const data = await loginUser(formData);
    localStorage.setItem("access-token", data.accessToken);

  } catch (err) {
    if (err.response) {
      setError(err.response.data.message);
    } else {
      setError("Impossible de se connecter. Réessayez plus tard.");
    }

  } finally {
    setLoading(false);
  }
};


  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="form-error">{error}</p>}

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

      <div className="form-group">
        <label>Mot de passe</label>
        <input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <div className="switch-link">
        Pas encore de compte ?{" "}
        <button type="button" onClick={onSwitchToRegister}>
          S'inscrire
        </button>
      </div>
    </form>
  );
}