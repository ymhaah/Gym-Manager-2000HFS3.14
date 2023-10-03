function Footer() {
    return (
        <footer aria-label="main footer">
            <div className="Container">
                <div className="footer__info">
                    <div className="footer__nav Div">
                        <nav aria-label="footer navigation">
                            <ul>
                                <li>
                                    <a href="#">text</a>
                                </li>
                                <li>
                                    <a href="#">text</a>
                                </li>
                                <li>
                                    <a href="#">text</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="footer__ownership">
                    <div className="madeWith Div">
                        <p>
                            Made with
                            <span className="hart">
                                <lord-icon
                                    src="https://cdn.lordicon.com/xryjrepg.json"
                                    trigger="hover"
                                    colors="primary:#0d6dfd"
                                    style="width:16px;height:16px"
                                ></lord-icon>
                            </span>
                            by
                        </p>
                    </div>
                    <div className="copyright Div">
                        <p>
                            {/* Copy right &copy; <span>{year}</span>
                    {title} */}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
