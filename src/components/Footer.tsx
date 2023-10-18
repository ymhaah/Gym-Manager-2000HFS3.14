import { Link } from "@nextui-org/react";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer aria-label="main footer">
            <span>
                Made with 💙 by{" "}
                <Link href="https://twitter.com/hafanwy">Youssef Hefnawy</Link>
            </span>
            <span>
                Copy right &copy; <span>{year}</span>
            </span>
        </footer>
    );
}

export default Footer;
