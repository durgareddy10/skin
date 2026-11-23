import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

const C = {
  bg: "#f7f4ee",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 860 : false
  );

  // Auto-close mobile menu on route change or screen resize
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 860;
      setIsMobile(mobile);
      if (!mobile) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
          email: session.user.email,
        });
      } else {
        const savedUser = localStorage.getItem("dermascan_user");
        if (savedUser && localStorage.getItem("dermascan_logged_in") === "true") {
          try {
            setUser(JSON.parse(savedUser));
          } catch {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      }
    });

    // Supabase auth state change
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
          email: session.user.email,
        };
        setUser(u);
        localStorage.setItem("dermascan_user", JSON.stringify(u));
        localStorage.setItem("currentUser", JSON.stringify(u));
        localStorage.setItem("loggedInUser", JSON.stringify(u));
        localStorage.setItem("dermascan_logged_in", "true");
        if (session.access_token) {
          localStorage.setItem("token", session.access_token);
          localStorage.setItem("dermascan_token", session.access_token);
        }
      } else {
        setUser(null);
      }
    });

    const handleCustomAuth = () => {
      const savedUser = localStorage.getItem("dermascan_user");
      if (savedUser && localStorage.getItem("dermascan_logged_in") === "true") {
        try {
          setUser(JSON.parse(savedUser));
        } catch {
          setUser(null);
        }
      }
    };

    window.addEventListener("authChanged", handleCustomAuth);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("authChanged", handleCustomAuth);
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    localStorage.clear();
    setUser(null);
    setMobileMenuOpen(false);

    window.dispatchEvent(new Event("authChanged"));
    window.dispatchEvent(new Event("auth-change"));

    navigate("/");
  };

  const navStyle = (path) => ({
    textDecoration: "none",
    color: location.pathname === path ? C.terracotta : C.brown,
    fontSize: "13.5px",
    fontWeight: location.pathname === path ? "700" : "600",
    padding: "8px 12px",
    borderRadius: "8px",
    background: location.pathname === path ? "rgba(185, 87, 49, 0.08)" : "transparent",
    transition: "0.2s ease",
  });

  const mobileNavStyle = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: "12px",
    textDecoration: "none",
    color: location.pathname === path ? C.terracotta : C.dark,
    fontSize: "16px",
    fontWeight: location.pathname === path ? "700" : "600",
    padding: "13px 16px",
    borderRadius: "12px",
    background: location.pathname === path ? "rgba(185, 87, 49, 0.09)" : "transparent",
    marginBottom: "4px",
  });

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "68px",
          zIndex: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "rgba(247, 244, 238, 0.98)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid ${C.border}`,
          boxSizing: "border-box",
        }}
      >
        {/* LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            textDecoration: "none",
            color: C.dark,
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          <span
            style={{
              width: "32px",
              height: "32px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "9px",
              background: C.dark,
              color: "#fff",
              fontSize: "15px",
            }}
          >
            ✦
          </span>
          Derma<span style={{ color: C.terracotta }}>Scan</span>
        </Link>

        {/* DESKTOP NAVIGATION LINKS (Hidden on Mobile) */}
        {!isMobile && (
          <div className="desktop-nav-links">
            <Link to="/" style={navStyle("/")}>
              Home
            </Link>
            <Link to="/check-skin" style={navStyle("/check-skin")}>
              Check Skin
            </Link>
            <Link to="/diseases" style={navStyle("/diseases")}>
              Diseases & Diets
            </Link>
            <Link to="/about" style={navStyle("/about")}>
              About
            </Link>
            <Link to="/contact" style={navStyle("/contact")}>
              Contact
            </Link>
            {user && (
              <Link to="/history" style={navStyle("/history")}>
                History
              </Link>
            )}
          </div>
        )}

        {/* DESKTOP AUTH BUTTONS (Hidden on Mobile) */}
        {!isMobile && (
          <div className="desktop-auth-buttons">
            {user ? (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    padding: "5px 12px",
                    borderRadius: "20px",
                    background: C.light,
                    color: C.brown,
                    fontSize: "12px",
                    fontWeight: "700",
                  }}
                >
                  <span
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "50%",
                      background: C.terracotta,
                      color: "#fff",
                      fontSize: "11px",
                    }}
                  >
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </span>
                  <span>{user.name || user.email}</span>
                </div>

                <button
                  onClick={logout}
                  style={{
                    border: "none",
                    borderRadius: "9px",
                    padding: "8px 14px",
                    background: C.dark,
                    color: "#fff",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                    color: C.dark,
                    fontSize: "13px",
                    fontWeight: "700",
                    padding: "8px 14px",
                  }}
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  style={{
                    textDecoration: "none",
                    padding: "9px 18px",
                    borderRadius: "10px",
                    background: C.terracotta,
                    color: "#fff",
                    fontSize: "13px",
                    fontWeight: "700",
                    boxShadow: "0 2px 8px rgba(185, 87, 49, 0.25)",
                  }}
                >
                  Create your account
                </Link>
              </div>
            )}
          </div>
        )}

        {/* MOBILE HEADER CONTROLS (Only Visible on Mobile) */}
        {isMobile && (
          <div className="mobile-nav-controls" style={{ display: "flex", alignItems: "center" }}>
            {/* HAMBURGER TOGGLE BUTTON */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              style={{
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: mobileMenuOpen ? "#ebd8cb" : "#eee5d9",
                border: `1px solid ${C.border}`,
                borderRadius: "11px",
                color: C.dark,
                fontSize: "20px",
                cursor: "pointer",
                transition: "0.2s",
              }}
            >
              {mobileMenuOpen ? "✕" : "☰"}
            </button>
          </div>
        )}
      </nav>

      {/* MOBILE FULL-SCREEN DROPDOWN DRAWER */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            top: "68px",
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(30, 26, 22, 0.45)",
            zIndex: 1090,
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              background: "#fffdfa",
              borderBottom: `2px solid ${C.border}`,
              padding: "20px 20px 30px",
              maxHeight: "85vh",
              overflowY: "auto",
              boxShadow: "0 15px 35px rgba(41, 37, 31, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* USER CARD (IF LOGGED IN) */}
            {user ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 16px",
                  background: "#f7f2ea",
                  borderRadius: "14px",
                  marginBottom: "16px",
                  border: "1px solid #e5dacb",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: C.terracotta,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      fontSize: "14px",
                    }}
                  >
                    {(user.name || user.email || "U").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: "700", fontSize: "14px", color: C.dark }}>
                      {user.name || "User"}
                    </div>
                    <div style={{ fontSize: "12px", color: C.brown }}>
                      {user.email}
                    </div>
                  </div>
                </div>
                <button
                  onClick={logout}
                  style={{
                    padding: "7px 14px",
                    background: "#fbebe7",
                    border: "1px solid #f2c7bb",
                    color: "#b42318",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: "18px",
                }}
              >
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px",
                    background: "#eee5d9",
                    color: C.dark,
                    textDecoration: "none",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "14px",
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "12px",
                    background: C.terracotta,
                    color: "#ffffff",
                    textDecoration: "none",
                    borderRadius: "10px",
                    fontWeight: "700",
                    fontSize: "14px",
                    boxShadow: "0 2px 8px rgba(185, 87, 49, 0.25)",
                  }}
                >
                  Create Account
                </Link>
              </div>
            )}

            {/* NAVIGATION LINKS */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link to="/" style={mobileNavStyle("/")} onClick={() => setMobileMenuOpen(false)}>
                <span>🏠</span> Home
              </Link>
              <Link
                to="/check-skin"
                style={mobileNavStyle("/check-skin")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🔬</span> Check Skin (AI Scanner)
              </Link>
              <Link
                to="/diseases"
                style={mobileNavStyle("/diseases")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>🥗</span> Diseases & Diet Guides
              </Link>
              <Link
                to="/about"
                style={mobileNavStyle("/about")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>ℹ️</span> About DermaScan
              </Link>
              <Link
                to="/contact"
                style={mobileNavStyle("/contact")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>📞</span> Contact & Support
              </Link>
              {user && (
                <Link
                  to="/history"
                  style={mobileNavStyle("/history")}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>📋</span> My Scan History
                </Link>
              )}
            </div>

            <div
              style={{
                marginTop: "20px",
                paddingTop: "15px",
                borderTop: "1px solid #ebd9c3",
                textAlign: "center",
                color: "#91877b",
                fontSize: "11px",
              }}
            >
              DermaScan · AI Dermatological Classification
            </div>
          </div>
        </div>
      )}
    </>
  );
}
