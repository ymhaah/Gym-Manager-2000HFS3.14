import { useState } from "react";
import react from "@vitejs/plugin-react-swc";
import { Button, ButtonGroup } from "@nextui-org/react";

function App({ name }: { name: string }) {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>
                {name} are {count}
                <Button color="primary">Button</Button>
            </h1>
        </>
    );
}

export default App;
