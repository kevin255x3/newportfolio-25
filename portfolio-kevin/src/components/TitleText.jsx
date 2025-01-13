import React from "react";
function TitleText() {
    return (
        <div className=" font-forma text-left fixed space-y-6 z-50">

            <div>
                <img src="./logo.png" alt="logo" className="w-44 h-24 object-fit" />


            </div>
            <div className="text-sm tracking-wide space-y-2 ml-4 text-black font-ming " >

                <p> Web Designer </p>
                <p> Born in 2001, Phillipines </p>
                <p> Based in Vancouver </p>
            </div>
        </div>
    )
};

export default TitleText;