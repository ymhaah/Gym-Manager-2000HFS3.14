import { useState, useEffect, useDebugValue } from "react";

export default function useMousePosition(handleMouseFun, isUsingGsap = true) {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    if (isUsingGsap) {
        import("gsap");
    }
    useEffect(() => {
        const handleMouseMove = (event) => {
            setMousePos({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        handleMouseFun(mousePos.x, mousePos.y);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [mousePos]);

    useDebugValue(mousePos);

    return mousePos;
}
