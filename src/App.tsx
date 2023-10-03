import { useState, createContext } from "react";
import react from "@vitejs/plugin-react-swc";
import { Button } from "@nextui-org/react";

type contextT = {
    theme: {
        themeConfig: { darkMode: boolean };
        setThemeConfig: () => object;
    };
};

const context = createContext(undefined);

function App() {
    const [themeConfig, setThemeConfig] = useState({
        darkMode: true,
    });

    return (
        <context.Provider
            value={{
                theme: {
                    themeConfig,
                    setThemeConfig,
                },
            }}
        >
            <main className="dark text-foreground bg-background">
                <div className="Container">
                    <Button>test buuton</Button>
                    <h1>test</h1>
                </div>
            </main>
        </context.Provider>
    );
}

export default App;
