import { Link as RLink } from "react-router-dom";
import { Link as UiLink } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

function Aside() {
    return (
        <aside>
            <nav className="bg-content1 overflow-auto rounded-small shadow-small">
                <ul>
                    <li className="bg-default/40  rounded-small shadow-small ">
                        <RLink
                            to="/"
                            className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                        >
                            Home
                        </RLink>
                    </li>
                    <li className="bg-default/40  rounded-small shadow-small ">
                        <RLink
                            to="/statistics"
                            className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                        >
                            Statistics
                        </RLink>
                    </li>
                    <li className="bg-default/40  rounded-small shadow-small ">
                        <RLink
                            to="/about"
                            className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                        >
                            About
                        </RLink>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
