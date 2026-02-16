import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import fr from "../../i18n/locales/fr.json";
import ar from "../../i18n/locales/ar.json";
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access-token"),
  );

  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();
  // 1️⃣ language state
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "fr",
  );

  // 2️⃣ translations
  const translations = { fr, ar };
  const t = translations[language];

  // 3️⃣ compute isRTL
  const isRTL = language === "ar";

  // 4️⃣ useEffect for dir
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  // Close desktop dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        desktopDropdownRef.current &&
        !desktopDropdownRef.current.contains(e.target)
      ) {
        setDesktopDropdownOpen(false);
      }
      if (
        mobileDropdownRef.current &&
        !mobileDropdownRef.current.contains(e.target)
      ) {
        setMobileDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.stopPropagation(); // prevent dropdown from closing first
    localStorage.removeItem("access-token");
    setIsAuthenticated(false);
    navigate("/login");
    window.location.reload();
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-logo">
          <span>7irfati</span>
        </div>

        <ul className="navbar-links">
          <li>
            <Link to="/">{t.home}</Link>
          </li>
          <li>
            <Link to="/services">{t.services}</Link>
          </li>
          <li>
            <Link to="/requests">{t.requests}</Link>
          </li>
          <li>
            <Link to="/messages">{t.messages}</Link>
          </li>
        </ul>

        <div className="navbar-actions">
          <div className="lang-switcher">
            <button onClick={() => handleLanguageChange("fr")}>FR</button>
            <button onClick={() => handleLanguageChange("ar")}>AR</button>
          </div>

          {!isAuthenticated ? (
            <div className="auth-buttons">
              <Link to="/login">
                <button className="btn-link">{t.login}</button>
              </Link>
              <Link to="/login">
                <button className="btn-primary">{t.register}</button>
              </Link>
            </div>
          ) : (
            <div className="auth-buttons dropdown" ref={desktopDropdownRef}>
              <button
                onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}
              >
                {t.profile}
              </button>
              {desktopDropdownOpen && (
                <div className="dropdown-menu">
                  <button className="btn-link danger" onClick={handleLogout}>
                    {t.logout}
                  </button>
                </div>
              )}
            </div>
          )}

          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? "show" : ""}`}>
        <Link to="/">{t.home}</Link>
        <Link to="/services">{t.services}</Link>
        <Link to="/requests">{t.requests}</Link>
        <Link to="/messages">{t.messages}</Link>

        {isAuthenticated && (
          <div className="dropdown" ref={mobileDropdownRef}>
            <button onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}>
              {t.profile}
            </button>
            {mobileDropdownOpen && (
              <div className="dropdown-menu">
                <button className="btn-link danger" onClick={handleLogout}>
                  {t.logout}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
