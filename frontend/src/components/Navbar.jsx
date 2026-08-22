import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const C = {
  bg: "#f7f4ee",
  dark: "#29251f",
  brown: "#756c61",
  terracotta: "#b95731",
  light: "#eee5d9",
  border: "#ded5c9",
};

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  const loadUser = () => {
    const loggedIn =
      localStorage.getItem("dermascan_logged_in") === "true";

    const savedUser =
      localStorage.getItem("dermascan_user");

    if (loggedIn && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    loadUser();

    window.addEventListener(
      "storage",
      loadUser
    );

    window.addEventListener(
      "authChanged",
      loadUser
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );

      window.removeEventListener(
        "authChanged",
        loadUser
      );
    };
  }, []);

  const logout = () => {
    localStorage.removeItem(
      "dermascan_token"
    );

    localStorage.removeItem(
      "dermascan_user"
    );

    localStorage.removeItem(
      "dermascan_logged_in"
    );

    window.dispatchEvent(
      new Event("authChanged")
    );

    navigate("/");
  };

  const navStyle = (path) => ({
    textDecoration: "none",

    color:
      location.pathname === path
        ? C.terracotta
        : C.brown,

    fontSize: "12px",

    fontWeight:
      location.pathname === path
        ? "700"
        : "500",

    padding: "9px 10px",

    borderRadius: "8px",
  });

  return (
    <nav
      style={{
        position: "fixed",

        top: 0,

        left: 0,

        right: 0,

        height: "74px",

        zIndex: 1000,

        display: "flex",

        alignItems: "center",

        justifyContent: "space-between",

        padding: "0 5%",

        background:
          "rgba(247,244,238,0.97)",

        borderBottom:
          `1px solid ${C.border}`,

        boxSizing: "border-box",
      }}
    >

      {/* LOGO */}

      <Link
        to="/"
        style={{
          display: "flex",

          alignItems: "center",

          gap: "9px",

          textDecoration: "none",

          color: C.dark,

          fontFamily:
            "Georgia, 'Times New Roman', serif",

          fontSize: "20px",

          fontWeight: "700",
        }}
      >
        <span
          style={{
            width: "36px",

            height: "36px",

            display: "flex",

            alignItems: "center",

            justifyContent: "center",

            borderRadius: "10px",

            background: C.dark,

            color: "#fff",

            fontSize: "17px",
          }}
        >
          ✦
        </span>

        Derma
        <span
          style={{
            color: C.terracotta,
            marginLeft: "-8px",
          }}
        >
          Scan
        </span>
      </Link>


      {/* CENTER NAVIGATION */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "3px",
        }}
      >

        <Link
          to="/"
          style={navStyle("/")}
        >
          Home
        </Link>

        <Link
          to="/about"
          style={navStyle("/about")}
        >
          About
        </Link>

        <Link
          to="/diseases"
          style={navStyle("/diseases")}
        >
          Diseases
        </Link>

        <Link
          to="/check-skin"
          style={navStyle("/check-skin")}
        >
          Check Skin
        </Link>

        <Link
          to="/contact"
          style={navStyle("/contact")}
        >
          Contact
        </Link>

        {user && (
          <Link
            to="/history"
            style={navStyle("/history")}
          >
            History
          </Link>
        )}

      </div>


      {/* RIGHT SIDE */}

      <div
        style={{
          display: "flex",

          alignItems: "center",

          gap: "9px",
        }}
      >

        {user ? (
          <>
            {/* USER */}

            <div
              style={{
                display: "flex",

                alignItems: "center",

                gap: "7px",

                padding:
                  "6px 10px",

                borderRadius: "20px",

                background: C.light,

                color: C.brown,

                fontSize: "10px",

                fontWeight: "700",
              }}
            >

              <span
                style={{
                  width: "25px",

                  height: "25px",

                  display: "flex",

                  alignItems: "center",

                  justifyContent: "center",

                  borderRadius: "50%",

                  background:
                    C.terracotta,

                  color: "#fff",

                  fontSize: "10px",
                }}
              >
                {(
                  user.name ||
                  user.email ||
                  "U"
                )
                  .charAt(0)
                  .toUpperCase()}
              </span>

              <span>
                {user.name ||
                  user.email}
              </span>

            </div>


            {/* LOGOUT */}

            <button
              onClick={logout}

              style={{
                border: "none",

                borderRadius: "9px",

                padding:
                  "10px 15px",

                background: C.dark,

                color: "#fff",

                fontSize: "10px",

                fontWeight: "700",

                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* LOGIN */}

            <Link
              to="/login"
              style={{
                textDecoration: "none",

                color: C.brown,

                fontSize: "11px",

                fontWeight: "600",

                padding:
                  "10px 12px",
              }}
            >
              Login
            </Link>


            {/* REGISTER */}

            <Link
              to="/register"
              style={{
                textDecoration: "none",

                padding:
                  "11px 17px",

                borderRadius: "9px",

                background: C.dark,

                color: "#fff",

                fontSize: "10px",

                fontWeight: "700",
              }}
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;