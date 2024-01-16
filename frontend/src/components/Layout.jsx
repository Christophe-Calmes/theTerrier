import { createBrowserRouter, createRoutesFromElements, Routes, Route, Link, Outlet } from "react-router-dom";

const Layout = () => {
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

  )
}

export default Layout