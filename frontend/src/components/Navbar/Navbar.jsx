import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import "./Navbar.scss";

export default function Navbar() {
  const { currentUser, isAuthenticated, login, logout } = useAuthContext();
  console.log(isAuthenticated);

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
        {!isAuthenticated && <NavLink to="/signin"> Sign-In </NavLink>}
        {!isAuthenticated && (
          <NavLink to="/signup">
            <button>
              Become a Member
              <i className="bi bi-arrow-right" />
            </button>
          </NavLink>
        )}

        {isAuthenticated && (
          <div className="user">
            <div className="user-name">
              <i className="bi bi-person-circle" />
              Moi
              {/* {currentUser.username} */}
            </div>
            <div className="user-logout">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
