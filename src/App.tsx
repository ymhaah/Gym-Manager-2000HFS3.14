// import { useState, useEffect, useRef } from "react";

import { Outlet } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage.tsx";
import usePageLoad from "./hooks/usePageLoad.tsx";

import { CircularProgress } from "@nextui-org/react";

import { Toaster } from "sonner";

import Header from "./components/Header.tsx";
import Aside from "./components/Aside.tsx";
import Footer from "./components/Footer.tsx";

function App() {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

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
            } text-foreground bg-background`}
        >
            <Toaster position="top-center" richColors />
            <div className="noPhone bg-danger-100  light">
                <p className="text-danger-500 text-2xl">
                    The library I used to create this project does not support
                    interactivity with small sizes
                </p>
            </div>
            {!pageLoad && (
                <div className="bg-background Loader">
                    <CircularProgress size="lg" aria-label="Loading..." />
                </div>
            )}

            <Header themeConfig={darkMode} switchTheme={switchTheme} />
            <div className="coll">
                <Aside />
                <main>
                    <section>
                        <Outlet />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default App;
