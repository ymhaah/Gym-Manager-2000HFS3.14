import React from "react";

function Loader() {
    return (
        <div className="loader" aria-live="assertive">
            <div className="loading-spinner">
                <div className="absolute">
                    <div className="small-dots circle spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="absolute">
                    <div className="big-dots circle spinner">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            {/* <div className="Container">
                <p>0%</p>
                <div className="loading-par" aria-label="loading par">
                    <div className="skeleton">
                        <span role="progressbar"></span>
                    </div>
                </div>
                <p>100%</p>
            </div> */}
        </div>
    );
}

export default Loader;
