import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function App() {
  return (
    <BrowserRouter>

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main
        style={{
          paddingTop: "74px",
          minHeight: "100vh",
        }}
      >

        <Routes>

          {/* HOME */}
          <Route
            path="/"
            element={<Home />}
          />

          {/* ABOUT */}
          <Route
            path="/about"
            element={<About />}
          />

          {/* DISEASES */}
          <Route
            path="/diseases"
            element={<Diseases />}
          />

          {/* DISEASE DETAILS */}
          <Route
            path="/diseases/:code"
            element={<DiseaseDetails />}
          />

          {/* CHECK SKIN */}
          <Route
            path="/check-skin"
            element={<CheckSkin />}
          />

          {/* RESULT */}
          <Route
            path="/result"
            element={<Result />}
          />

          {/* CONTACT */}
          <Route
            path="/contact"
            element={<Contact />}
          />

          {/* LOGIN */}
          <Route
            path="/login"
            element={<Login />}
          />

          {/* REGISTER */}
          <Route
            path="/register"
            element={<Register />}
          />

          {/* HISTORY */}
          <Route
            path="/history"
            element={<History />}
          />

          {/* ANY UNKNOWN URL */}
          <Route
            path="*"
            element={<NotFound />}
          />

        </Routes>

      </main>


      {/* FOOTER */}
      <footer
        style={{
          padding: "28px 6%",

          background: "#eee8de",

          borderTop:
            "1px solid #ded5c9",

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