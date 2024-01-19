import { Link, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  return (
    <div>
      <div>
        <Link to="/"> Home </Link>
        <Link to="/signin"> Sign-In </Link>
      </div>
        <Outlet/>
    </div>
  )
}

export default ProtectedRoute