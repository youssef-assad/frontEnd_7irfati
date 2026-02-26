import { useState } from "react";
import { loginUser } from "./AuthApi";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function LoginForm({ onSwitchToRegister }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { t } = useLanguage();
  const navigate = useNavigate();

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
      navigate('/')
      window.location.reload();
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
        <label>{t.auth.email}</label>
        <input
          type="email"
          name="email"
          placeholder={t.auth.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>{t.auth.password}</label>
        <input
          type="password"
          name="password"
          placeholder={t.auth.passwordPlaceholder}
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="btn-submit" disabled={loading}>
        {loading ? t.auth.login : t.auth.loginButton}
      </button>

      <div className="switch-link">
        {t.auth.noAccount}{" "}
        <button type="button" onClick={onSwitchToRegister}>
          {t.auth.registerButton}
        </button>
      </div>
    </form>
  );
}
