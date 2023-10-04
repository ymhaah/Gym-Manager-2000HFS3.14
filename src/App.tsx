import { useState } from "react";
import react from "@vitejs/plugin-react-swc";
import { Button } from "@nextui-org/react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@nextui-org/react";

type themeT = {
    darkMode: boolean;
};

function App() {
    const [themeConfig, setThemeConfig] = useState<themeT>({
        darkMode: true,
    });

    return (
        <main
            className={`${
                themeConfig.darkMode ? "dark" : "light"
            } text-foreground bg-background`}
        >
            <div className="Container">
                <Button
                    onClick={() =>
                        setThemeConfig({
                            darkMode: false,
                        })
                    }
                >
                    light mode
                </Button>
                <Button
                    onClick={() =>
                        setThemeConfig({
                            darkMode: true,
                        })
                    }
                >
                    dark mode
                </Button>
                <div>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>NAME</TableColumn>
                            <TableColumn>ROLE</TableColumn>
                            <TableColumn>STATUS</TableColumn>
                        </TableHeader>
                        <TableBody>
                            <TableRow key="1">
                                <TableCell>Tony Reichert</TableCell>
                                <TableCell>CEO</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="2">
                                <TableCell>Zoey Lang</TableCell>
                                <TableCell>Technical Lead</TableCell>
                                <TableCell>Paused</TableCell>
                            </TableRow>
                            <TableRow key="3">
                                <TableCell>Jane Fisher</TableCell>
                                <TableCell>Senior Developer</TableCell>
                                <TableCell>Active</TableCell>
                            </TableRow>
                            <TableRow key="4">
                                <TableCell>William Howard</TableCell>
                                <TableCell>Community Manager</TableCell>
                                <TableCell>Vacation</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </div>
            </div>
        </main>
    );
}

export default App;
