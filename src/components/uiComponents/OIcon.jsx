function OIcon(prop) {
    let stroke;
    prop.hover ? (stroke = 2) : (stroke = 0);

    return (
        <svg
            width={64 + stroke}
            height={64 + stroke}
            viewBox={`0 0 ${64 + stroke} ${64 + stroke}`}
            xmlns="http://www.w3.org/2000/svg"
            className={`${accentFun(prop.accent)} O-icon`}
        >
            <title>O icon</title>
            <path
                d={
                    prop.hover
                        ? "M33 1c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C15.327 65 1 50.673 1 33 1 15.327 15.327 1 33 1Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                        : "M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z"
                }
                fill={prop.hover ? "none" : "var(--accent-clr)"}
                stroke={prop.hover ? "var(--accent-clr)" : "none"}
                strokeWidth={stroke}
                fillRule={
                    (!prop.hover && prop.accent == "x") || prop.accent == "o"
                        ? "evenodd"
                        : "nonzero"
                }
            />
        </svg>
    );
}

export default OIcon;
