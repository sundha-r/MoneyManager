import { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const AppContext=createContext();

export const AppContextProvider =({children})=>{
    const location = useLocation();
    const [user,setUser]=useState(null);
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem("theme");
        if (saved) return saved;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    });

    useEffect(() => {
        const isLogged = !!user || !!localStorage.getItem("token");
        const isThemePage = !["/", "/login", "/signup"].includes(location.pathname);
        if (isLogged && isThemePage) {
            if (theme === "dark") {
                document.documentElement.classList.add("dark");
                document.body.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
                document.body.classList.remove("dark");
            }
            localStorage.setItem("theme", theme);
        } else {
            document.documentElement.classList.remove("dark");
            document.body.classList.remove("dark");
        }
    }, [theme, user, location.pathname]);

    const toggleTheme = () => {
        setTheme(prev => prev === "light" ? "dark" : "light");
    };

    const clearUser=()=>{
        setUser(null);
    }

    const contextValue={
        user,
        setUser,
        clearUser,
        theme,
        toggleTheme
    }

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    )
}