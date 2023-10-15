import { useState, useRef } from "react";
import react from "@vitejs/plugin-react-swc";

import { Outlet, Link } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage.tsx";

import Header from "./components/Header.tsx";
import Aside from "./components/Aside.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", true);

    function switchTheme() {
        setDarkMode((prevThemeMode: boolean) => {
            return !prevThemeMode;
        });
    }

    return (
        <div
            className={`${
                darkMode ? "dark" : "light"
            } text-foreground bg-background`}
        >
            <Header themeConfig={darkMode} switchTheme={switchTheme} />
            <Aside />
            <Link to="/statistics">statistics</Link>
            <main>
                <div className="Container">
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default App;
