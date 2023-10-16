import { useState, useEffect } from "react";

export default function usePageLoad() {
    const [pageLoad, setPageLoad] = useState<boolean>(false);

    useEffect(() => {
        const onPageLoad = () => {
            setPageLoad(true);
        };

        if (document.readyState == "complete") {
            onPageLoad();
        } else {
            window.addEventListener("load", onPageLoad, false);
            return () => window.removeEventListener("load", onPageLoad);
        }
    }, []);

    return pageLoad;
}

// ! return t/f if the page load or not
