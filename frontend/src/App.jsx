import Home from "./pages/Home";
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Routes, Route, Link, Outlet } from "react-router-dom";
import Feed from "@pages/Feed";
import SignIn from "@pages/SignIn";
import SignUp from "@pages/SignUp";
import Profile from "@pages/Profile";
import Admin from "@pages/Admin";
import Layout from "@components/Layout";
import Error from "@pages/Error";

import AuthProvider from "./context/AuthProvider";
import "./App.css";


function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/admin" element={<Admin/>}/>
      </Route>
    )
  )

  return (
    <div className="App">
      <AuthProvider>
        <RouterProvider router={router}/>
      </AuthProvider>
    </div>
  );
}

export default App;
