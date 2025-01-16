import React, { useState, lazy, Suspense } from "react";
import "../css/HomePage.css";
import { Link } from "react-router-dom";

const TitleText = lazy(() => import("./TitleText"));

function HomePage() {
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [loadedImages, setLoadedImages] = useState({});

    React.useEffect(() => {
        const imagePaths = {
            projects: './baldy.jpg',
            about: './img/who-preview.png',
            contact: './img/misc-preview.png',
            footer: './footer.png'
        };

        Object.entries(imagePaths).forEach(([key, path]) => {
            const img = new Image();
            img.onload = () => setLoadedImages(prev => ({ ...prev, [key]: true }));
            img.src = path;
        });
    }, []);

    const handleMouseEnter = React.useCallback((linkName) => {
        setHoveredLink(linkName);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setHoveredLink(null);
    }, []);

    const bgClass = React.useMemo(() => {
        switch (hoveredLink) {
            case "projects": return "bg-red-100";
            case "about": return "bg-green-100";
            case "contact": return "bg-blue-100";
            default: return "bg-white";
        }
    }, [hoveredLink]);

    const rightPanelContent = React.useMemo(() => {
        const renderLoadingPlaceholder = () => (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
        );

        if (hoveredLink === "projects" && loadedImages.projects) {
            return (
                <img
                    src="./baldy.jpg"
                    alt="Projects Preview"
                    className="w-full h-auto object-fit"
                    loading="lazy"
                />
            );
        } else if (hoveredLink === "about" && loadedImages.about) {
            return (
                <img
                    src="./img/who-preview.png"
                    alt="About Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
            );
        } else if (hoveredLink === "contact" && loadedImages.contact) {
            return (
                <img
                    src="./img/misc-preview.png"
                    alt="Contact Preview"
                    className="w-full h-full object-fit"
                    loading="lazy"
                />
            );
        } else if (!hoveredLink) {
            return (
                <>
                    {!isVideoLoaded && renderLoadingPlaceholder()}
                    <video
                        className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src="./portfolio.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        onLoadedData={() => setIsVideoLoaded(true)}
                    />
                </>
            );
        }
        return renderLoadingPlaceholder();
    }, [hoveredLink, isVideoLoaded, loadedImages]);

    return (
        <Suspense fallback={
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="animate-pulse text-xl font-ming">Loading...</div>
            </div>
        }>
            <TitleText />
            <div className={`w-screen h-screen flex items-center justify-center transition-colors duration-200 ${bgClass}`}>
                <div className="relative w-full h-full max-w-6xl max-h-screen px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center perspective-3d">
                    <div className="w-full lg:w-80 h-64 lg:h-96 border border-americanred flex items-center justify-center mb-8 lg:mb-0 lg:mr-16 vertical-tilt text-sm font-ming">
                        <ul className="space-y-3 text-lg sm:text-xl text-center">
                            <li onMouseEnter={() => handleMouseEnter("projects")} onMouseLeave={handleMouseLeave}>
                                <Link to="/projects">Portfolio</Link>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter("about")} onMouseLeave={handleMouseLeave}>
                                <Link to="/about">About</Link>
                            </li>
                            <li onMouseEnter={() => handleMouseEnter("contact")} onMouseLeave={handleMouseLeave}>
                                <Link to="/contact">Information</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="border-americanblue w-full lg:w-80 h-64 lg:h-96 overflow-hidden border flex items-center justify-center vertical-tilt-two">
                        {rightPanelContent}
                    </div>
                </div>
            </div>

            <div className="relative w-screen h-screen">
                {loadedImages.footer ? (
                    <img
                        src="./footer.png"
                        alt="Creature"
                        className="fixed bottom-0 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96"
                        loading="lazy"
                    />
                ) : (
                    <div className="fixed bottom-0 right-0 w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 bg-gray-200 animate-pulse" />
                )}
            </div>

            <div className="fixed bottom-0 left-0 mb-4 ml-4 space-y-2 font-ming text-sm sm:text-md tracking-wide text-black">
                <a href="https://www.linkedin.com/in/kevin-l-280314285/" className="block hover:text-americanred transition-colors duration-200">LinkedIn</a>
                <a href="https://www.are.na/kevin-lazo/channels" className="block hover:text-americanred transition-colors duration-200">Are.na</a>
                <a href="https://www.youtube.com/@dinnereservations/videos" className="block hover:text-americanred transition-colors duration-200">YouTube</a>
            </div>
        </Suspense>
    );
}

export default HomePage;