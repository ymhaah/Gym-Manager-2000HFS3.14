import { useState, useRef } from "react";
import react from "@vitejs/plugin-react-swc";

import useLocalStorage from "./hooks/useLocalStorage.tsx";

import Header from "./components/Header.tsx";
import Manager from "./components/Manager.tsx";

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
            <main>
                <Manager />
            </main>
        </div>
    );
}

export default App;
