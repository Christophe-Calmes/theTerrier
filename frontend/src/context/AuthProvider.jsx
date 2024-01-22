import React, { createContext, useContext, useState } from "react";

// create context
export const AuthContext = createContext(null);

// the provider
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const login = (jwtToken) => {
    setIsAuthenticated(true);
    // setCurrentUser();
    // Save the JWT in local storage
    localStorage.setItem("jwtToken", jwtToken);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ setCurrentUser, isAuthenticated, login, logout }}
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
