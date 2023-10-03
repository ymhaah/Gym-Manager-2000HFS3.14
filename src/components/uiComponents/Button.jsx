import { useButton, usePress } from "react-aria";
import { useRef } from "react";

function ButtonExample({ onPress, children }) {
    let ref = useRef();
    let { buttonProps, isPressed } = useButton({ onPress }, ref);
    // let { pressProps, isPressed } = usePress();
    console.log(onPress);
    return (
        <button {...buttonProps} ref={ref}>
            {children}
        </button>
    );
}

function Button() {
    const handlePress = () => {
        alert("Button pressed! test");
    };

    return (
        <>
            <ButtonExample onPress={handlePress}>Click Me</ButtonExample>
        </>
    );
}

// function Button(prop) {
//     return (
//         <button
//             type="button"
//             className={`Button focus ${null}`}
//             onClick={prop.handelClick}
//             aria-controls={null}
//         >
//             {prop.content}
//         </button>
//     );
// }
export default Button;
