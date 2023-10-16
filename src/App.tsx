import { useState, useEffect, useRef } from "react";
import react from "@vitejs/plugin-react-swc";

import { Outlet, Link } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage.tsx";
import usePageLoad from "./hooks/usePageLoad.tsx";

import { CircularProgress } from "@nextui-org/react";

import Header from "./components/Header.tsx";
import Aside from "./components/Aside.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", true);

    const pageLoad = usePageLoad();

    function switchTheme() {
        setDarkMode((prevThemeMode: boolean) => {
            return !prevThemeMode;
        });
    }

    return (
        <div
            className={`${
                darkMode ? "dark" : "light"
            } text-foreground bg-background `}
        >
            {!pageLoad && (
                <div className="bg-background Loader">
                    <CircularProgress size="lg" aria-label="Loading..." />
                </div>
            )}
            <Header themeConfig={darkMode} switchTheme={switchTheme} />
            <div className="Coll">
                <Aside />
                <main>
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;
