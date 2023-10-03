import { useLayoutEffect } from "react";
import { gsap } from "gsap";

export default function useGsap(animation, father) {
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            animation();
        }, father);
        return () => ctx.revert();
    }, []);
}
