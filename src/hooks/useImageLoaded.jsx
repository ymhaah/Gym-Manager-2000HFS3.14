import { useDebugValue, useEffect, useState } from "react";

export default function useImageLoaded(images, setImageLoaded, delay = 0) {
    let [imageArr, setImageArr] = useState([]);
    let imagesLoaded = false;

    function loadedFun(isLoaded) {
        setImageArr((prevImageArr) => {
            return [...prevImageArr, isLoaded];
        });
    }
    useEffect(() => {
        if (
            imageArr.every((image) => {
                return image;
            }) &&
            images.length == imageArr.length
        ) {
            setTimeout(() => {
                setImageLoaded(true);
                imagesLoaded = true;
            }, delay * 1000);
        }
    }, [imageArr]);

    useDebugValue(imagesLoaded);

    return [imagesLoaded, loadedFun];
}

// ? pass all image array and the state you want to make it true and a delay
// ? return 'imagesLoaded' boolean you can use for conditional render & the update function
