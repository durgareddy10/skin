import { NavLink } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-main">

        <div className="footer-brand">

          <div className="footer-logo">
            <div className="footer-logo-icon">
              ✦
            </div>

            <span>
              Derma<span>Scan</span>
            </span>
          </div>

          <p>
            AI-assisted skin image analysis powered by
            deep learning.
          </p>

        </div>


        <div className="footer-links">

          <div>
            <span className="footer-title">
              Explore
            </span>

            <NavLink to="/">
              Home
            </NavLink>

            <NavLink to="/about">
              About
            </NavLink>

            <NavLink to="/diseases">
              Diseases
            </NavLink>
          </div>


          <div>
            <span className="footer-title">
              Analysis
            </span>

            <NavLink to="/check-skin">
              Check Skin
            </NavLink>

            <NavLink to="/contact">
              Contact
            </NavLink>
          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <span>
          © {new Date().getFullYear()} DermaScan
        </span>

        <span>
          AI-assisted skin classification
        </span>

      </div>

    </footer>
  );
}

export default Footer;