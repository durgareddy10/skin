import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { supabase } from "./lib/supabase";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Diseases from "./pages/Diseases";
import DiseaseDetails from "./pages/DiseaseDetails";
import CheckSkin from "./pages/CheckSkin";
import Result from "./pages/Result";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import History from "./pages/History";
import NotFound from "./pages/NotFound";

function AuthRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash || "";
    const search = window.location.search || "";

    // If coming from email confirmation link (#access_token=...&type=signup or code=...)
    if (hash.includes("type=signup") || hash.includes("access_token=") || search.includes("code=")) {
      sessionStorage.setItem("just_confirmed_email", "true");
      if (
        window.location.pathname === "/" ||
        window.location.pathname === "/login" ||
        window.location.pathname === "/register"
      ) {
        navigate("/check-skin", { replace: true });
      }
    }

    // Supabase auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        const u = {
          id: session.user.id,
          name: session.user.user_metadata?.name || session.user.email.split("@")[0],
          email: session.user.email,
        };
        localStorage.setItem("dermascan_user", JSON.stringify(u));
        localStorage.setItem("currentUser", JSON.stringify(u));
        localStorage.setItem("loggedInUser", JSON.stringify(u));
        localStorage.setItem("dermascan_logged_in", "true");
        if (session.access_token) {
          localStorage.setItem("token", session.access_token);
          localStorage.setItem("dermascan_token", session.access_token);
        }
        window.dispatchEvent(new Event("authChanged"));
        window.dispatchEvent(new Event("auth-change"));

        if (
          event === "SIGNED_IN" &&
          (hash.includes("type=signup") ||
            hash.includes("access_token") ||
            sessionStorage.getItem("just_confirmed_email") === "true")
        ) {
          sessionStorage.setItem("just_confirmed_email", "true");
          window.history.replaceState(null, "", window.location.pathname);
          navigate("/check-skin");
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return null;
}

function App() {
  return (
    <BrowserRouter>
      {/* GLOBAL AUTH REDIRECT HANDLER */}
      <AuthRedirectHandler />

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main
        style={{
          paddingTop: "68px",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/diseases" element={<Diseases />} />
          <Route path="/diseases/:code" element={<DiseaseDetails />} />
          <Route path="/check-skin" element={<CheckSkin />} />
          <Route path="/result" element={<Result />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: "28px 6%",
          background: "#eee8de",
          borderTop: "1px solid #ded5c9",
          color: "#81776c",
          fontSize: "10px",
          textAlign: "center",
        }}
      >
        © 2026 DermaScan · AI-assisted skin classification
      </footer>
    </BrowserRouter>
  );
}

export default App;
