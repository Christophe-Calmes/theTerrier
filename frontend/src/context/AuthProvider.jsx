import React, { createContext, useContext, useState } from "react";

// create context
export const AuthContext = createContext(null)

// the provider
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    const login = (email, password) => {
        setIsAuthenticated(true)
        setUser(email)
    } 

    const logout = () => {
        setIsAuthenticated(false)
        setUser(null)
    } 


    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider

// Hook personalisé qui permet de use le context
export function useAuthContext(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useThemeContext must be used within a ThemeContextProvider")
    }

    return context
}
