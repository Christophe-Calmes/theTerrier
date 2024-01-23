import React, { createContext, useContext, useEffect, useState } from "react";

// create context
export const AuthContext = createContext(null);

// the provider
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const login = (jwtToken, userData) => {
    console.log(userData, "auth provider userData");
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem("jwtToken", jwtToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// Hook personalisé qui permet de use le context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeContextProvider"
    );
  }

  return context;
}
