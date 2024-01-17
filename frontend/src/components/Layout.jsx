import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/signin"> Sign-In </Link>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
