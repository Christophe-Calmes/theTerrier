import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Feed from "@pages/Feed";
import SignIn from "@pages/SignIn/SignIn";
import SignUp from "@pages/SignUp";
import Profile from "@pages/Profile";
import Admin from "@pages/Admin";
import Layout from "@components/Layout";
import Home from "./pages/Home/Home";

import ProtectedRoute from "@components/ProtectedRoute";

import AuthProvider from "./context/AuthProvider";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/feed" element={<Feed />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/users/:id" element={<Profile />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Route>
    )
  );

  return (
    <div className="app">
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </div>
  );
}

export default App;
