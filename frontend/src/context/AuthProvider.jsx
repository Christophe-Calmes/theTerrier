import React, { createContext, useContext, useEffect, useState } from "react";

// create context
export const AuthContext = createContext(null);

// the provider
function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const login = (jwtToken, userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem("jwtToken", jwtToken);
  
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("jwtToken");
  };

  const checkAndRefeshJwt = async (jwtToken) => {
    console.warn("checkAndRefeshJwt");
    const url = "http://localhost:5000/checkAndRefeshJwt";
    try {
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include any additional headers if needed
        },
        body: JSON.stringify({ jwtToken: jwtToken }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response JSON
      const data = await response.json();
      // Handle the response data
      login(jwtToken, data.userData);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken && !currentUser) {
      checkAndRefeshJwt(jwtToken);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout, checkAndRefeshJwt }}
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
