import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access-token")
  );

  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);

  const desktopDropdownRef = useRef();
  const mobileDropdownRef = useRef();

  // ✅ GLOBAL language (correct)
  const { t, setLanguage } = useLanguage();

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  // Close dropdowns when clicking outside
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
    e.stopPropagation();
    localStorage.removeItem("access-token");
    setIsAuthenticated(false);

    navigate("/login"); // ✅ enough, no reload
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar" aria-label="Main navigation">
        <div className="navbar-logo">
          <span>7irfati</span>
        </div>

        <ul className="navbar-links">
          <li><Link to="/">{t.home}</Link></li>
          <li><Link to="/services">{t.services}</Link></li>
          <li><Link to="/requests">{t.requests}</Link></li>
          <li><Link to="/messages">{t.messages}</Link></li>
        </ul>

        <div className="navbar-actions">
          {/* 🌐 Language */}
          <div className="lang-switcher">
            <button onClick={() => handleLanguageChange("fr")}>FR</button>
            <button onClick={() => handleLanguageChange("ar")}>AR</button>
          </div>

          {/* 🔐 Auth */}
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
              <button onClick={() => setDesktopDropdownOpen(!desktopDropdownOpen)}>
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

          {/* 🍔 Mobile */}
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

      {/* 📱 Mobile menu */}
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