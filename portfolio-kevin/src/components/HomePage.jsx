import React, { useState } from "react";
import "../css/HomePage.css";
import TitleText from "./TitleText";
import { Link } from "react-router-dom";

function HomePage() {
    // Track which link (if any) is hovered
    const [hoveredLink, setHoveredLink] = useState(null);

    // Helper functions to set / clear hovered link
    const handleMouseEnter = (linkName) => setHoveredLink(linkName);
    const handleMouseLeave = () => setHoveredLink(null);

    // Determine background color based on hovered link (optional)
    let bgClass = "bg-white"; // default
    if (hoveredLink === "projects") {
        bgClass = "bg-red-100";
    } else if (hoveredLink === "about") {
        bgClass = "bg-green-100";
    } else if (hoveredLink === "contact") {
        bgClass = "bg-blue-100";
    }

    // Choose video or image preview based on hovered link
    let rightPanelContent;
    if (hoveredLink === "projects") {
        rightPanelContent = (
            <img
                src="./baldy.jpg"
                alt="Projects Preview"
                className="w-full h-auto object-fit"
            />
        );
    } else if (hoveredLink === "about") {
        rightPanelContent = (
            <img
                src="./img/who-preview.png"
                alt="About Preview"
                className="w-full h-full object-cover"
            />
        );
    } else if (hoveredLink === "contact") {
        rightPanelContent = (
            <img
                src="./img/misc-preview.png"
                alt="Contact Preview"
                className="w-full h-full object-fit"
            />
        );
    } else {
        // Default: show the video
        rightPanelContent = (
            <video
                className="w-full h-full object-cover"
                src="./portfolio.mp4"
                autoPlay
                loop
                muted
            />
        );
    }



    return (
        <>
            <TitleText />

            {/* Outer container with dynamic background color */}
            <div
                className={`w-screen h-screen flex items-center justify-center transition-colors duration-200 ${bgClass}`}
            >
                <div className="relative w-[1920px] h-[1080px] flex items-center justify-center perspective-3d">
                    {/* LEFT BOX (Navigation Menu) with tilt */}
                    <div className="w-80 h-96  border border-americanred flex items-center justify-center mr-16 vertical-tilt text-sm font-ming">
                        <ul className="space-y-3 text-xl text-center">
                            <li
                                onMouseEnter={() => handleMouseEnter("projects")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/projects">Portfolio</Link>
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter("about")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/about">About</Link>
                            </li>
                            <li
                                onMouseEnter={() => handleMouseEnter("contact")}
                                onMouseLeave={handleMouseLeave}
                            >
                                <Link to="/contact">Information</Link>
                            </li>
                        </ul>
                    </div>

                    {/* RIGHT BOX (Video or Image Preview) */}
                    <div className="border-americanblue w-80 h-96 overflow-hidden  border flex items-center justify-center vertical-tilt-two">
                        {rightPanelContent}
                    </div>
                </div>
            </div>

            {/* Footer image or other content */}
            <div className="relative w-screen h-screen">
                <img
                    src="./footer.png"
                    alt="Creature"
                    className="fixed bottom-0 right-0 w-80 h-96"
                />
            </div>

            {/* Fixed bottom-left links */}
            <div className="fixed bottom-0 left-0 mb-4 ml-4 space-y-2 font-ming text-md tracking-wide text-black ">
                <a href="#" className="block">
                    LinkedIn
                </a>
                <a href="#" className="block">
                    Resume
                </a>
                <a href="#" className="block">
                    YouTube
                </a>
            </div>
        </>
    );
}

export default HomePage;
