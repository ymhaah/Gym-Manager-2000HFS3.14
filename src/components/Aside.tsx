import { Link as UiLink } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";
import { toast } from "sonner";

// import { Link as RLink } from "react-router-dom";
// TODO: use react router

function Aside() {
    return (
        <aside>
            <nav>
                <ul>
                    <li>
                        <UiLink
                            // to="/"
                            // className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                            style={{ cursor: "not-allowed" }}
                            onClick={() => toast.error("Incomplete Feature")}
                        >
                            Home
                        </UiLink>
                        <Divider className="my-1" />
                    </li>
                    <li>
                        <UiLink
                            // to="/statistics"
                            // className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                            style={{ cursor: "not-allowed" }}
                            onClick={() => toast.error("Incomplete Feature")}
                        >
                            Statistics
                        </UiLink>
                        <Divider className="my-1" />
                    </li>
                    <li>
                        <UiLink
                            // to="/about"
                            // className="tap-highlight-transparent text-default-foreground hover:opacity-80 active:opacity-disabled transition-opacity whitespace-nowrap font-semibold"
                            style={{ cursor: "not-allowed" }}
                            onClick={() => toast.error("Incomplete Feature")}
                        >
                            About
                        </UiLink>
                        <Divider className="my-1" />
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
