function Header() {
    // let header = document.querySelector('header[aria-label="main header"]');
    // let mobileNavToggle = document.querySelector(".mobile-nav-toggle");
    // let nav = document.querySelector("#main-navigation-list");

    // let headerHight = header.getBoundingClientRect().height;

    // mobileNavToggle.addEventListener("click", () => {
    //     if (nav.getAttribute("data-visible") === "false") {
    //         nav.setAttribute("data-visible", "true");
    //         mobileNavToggle.setAttribute("aria-expanded", "true");
    //     } else if (nav.getAttribute("data-visible") === "true") {
    //         nav.setAttribute("data-visible", "false");
    //         mobileNavToggle.setAttribute("aria-expanded", "false");
    //     }
    // });

    // document.documentElement.style.setProperty(
    //     "--header-padding-hight",
    //     headerHight - 1 + "px"
    // );

    return (
        <header aria-label="main header">
            <div className="Container header__Container">
                <div className="c1">
                    <div className="header__Logo">
                        <a href="/" className="main__logo focus">
                            <img src="" alt="logo" />
                            <span className="visually-hidden">HS</span>
                        </a>
                        {/* <!-- ! make it link to the main hs --> */}
                        <a href="/" className="article__logo focus">
                            {" "}
                            .Blog
                        </a>
                    </div>
                    {/* <!-- ? put id content everywhere --> */}
                    <a
                        href="#content"
                        title="click Enter to skip navigation menu"
                        className="skip-nav-link Button focus"
                    >
                        skip nav
                    </a>
                </div>
                <div className="c2">
                    <button
                        type="button"
                        aria-controls="main-navigation-list"
                        aria-expanded="false"
                        className="mobile-nav-toggle"
                    >
                        <span className="visually-hidden">Menu</span>X
                    </button>
                    <nav
                        className="header__main-navigation"
                        aria-label="main navigation"
                    >
                        <ul
                            data-visible="false"
                            id="main-navigation-list"
                            className=""
                        >
                            <li>
                                <a href="#" data-selected="true">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#" data-selected="false">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" data-selected="false">
                                    About Me
                                </a>
                            </li>
                            <li>
                                <a href="#" data-selected="false">
                                    More
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
