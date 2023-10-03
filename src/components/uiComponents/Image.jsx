import { useState, useRef } from "react";
import { Blurhash } from "react-blurhash";

function Image({
    className = "",
    src,
    webp,
    hash,
    id = null,
    loaded,
    alt = "",
}) {
    const [imgLoaded, setImgLoaded] = useState(false);
    let image = useRef(null);

    return (
        <div className={`image ${className}`}>
            {hash && (
                <div
                    className="blur"
                    style={{
                        display: !imgLoaded ? "inline" : "none",
                    }}
                    aria-hidden={imgLoaded}
                >
                    <Blurhash hash={hash} />
                </div>
            )}

            <picture>
                {webp && <source type="image/webp" srcSet={webp} />}
                <img
                    ref={image}
                    src={src}
                    onLoad={() => {
                        setImgLoaded(true);
                        loaded && loaded(true);
                    }}
                    style={{
                        display: imgLoaded ? "block" : "none",
                    }}
                    alt={alt}
                    aria-label={alt}
                    id={id}
                    role="img"
                />
            </picture>
        </div>
    );
}

export default Image;
