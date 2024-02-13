import { Link, NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthProvider";
import "./Navbar.scss";

export default function Navbar() {
  const { currentUser, isAuthenticated, logout } = useAuthContext();
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
            <button data-testid="register-btn">
              Become a Member
              <i className="bi bi-arrow-right" />
            </button>
          </NavLink>
        )}

        {isAuthenticated && (
          <div className="user">
            {currentUser && (
              //<NavLink to={`/users/${currentUser.id}`}>
              <NavLink to={`/profile`}>
                <i className="bi bi-person-circle" />
                {currentUser.email}
              </NavLink>
            )}
            {isAuthenticated && <NavLink to="/addinterests">Add interests</NavLink>}
            {currentUser?.role === "admin" && <NavLink to="/admin">Admin</NavLink>}
            <div className="user-logout">
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
