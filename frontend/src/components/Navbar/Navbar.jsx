import { Link, NavLink } from "react-router-dom";
import "./Navbar.scss";

export default function Navbar() {
  return (
    <nav>
      <div className="left">
        <NavLink to="/">
          <div className="logo">
            <i className="bi bi-slack">The Terrier</i>
          </div>
        </NavLink>
      </div>

      <div className="mid" />

      <div className="right">
        <NavLink to="/signin"> Sign-In </NavLink>
        <NavLink to="/signup">
          <button>
            Become a Member
            <i className="bi bi-arrow-right" />
          </button>
        </NavLink>
      </div>
    </nav>
  );
}
