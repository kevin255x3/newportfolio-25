import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "../css/HomePage.css";

function HomePage() {
    const [hoveredLink, setHoveredLink] = React.useState(null);
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
    const [loadedImages, setLoadedImages] = React.useState({});
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
    const mediaPanelRef = React.useRef(null);

    React.useEffect(() => {
        const imagePaths = {
            projects: '/baldy.jpg',
            about: '/img/who-preview.png',
            contact: '/img/misc-preview.png',
            footer: '/footer.png'
        };

        Object.entries(imagePaths).forEach(([key, path]) => {
            const img = new Image();
            img.onload = () => setLoadedImages(prev => ({ ...prev, [key]: true }));
            img.src = path;
        });
    }, []);

    const handleMouseMove = (e) => {
        if (!mediaPanelRef.current) return;

        const rect = mediaPanelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const rotateY = ((x / rect.width) - 0.5) * 30;
        const rotateX = ((y / rect.height) - 0.5) * -30;

        setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseEnter = React.useCallback((linkName) => {
        setHoveredLink(linkName);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setHoveredLink(null);
    }, []);

    const rightPanelContent = React.useMemo(() => {
        const renderLoadingPlaceholder = () => (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
        );

        if (hoveredLink === "projects" && loadedImages.projects) {
            return (
                <motion.img
                    src="/baldy.jpg"
                    alt="Projects Preview"
                    className="w-full h-auto object-fit"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            );
        } else if (hoveredLink === "about" && loadedImages.about) {
            return (
                <motion.img
                    src="/img/who-preview.png"
                    alt="About Preview"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            );
        } else if (hoveredLink === "contact" && loadedImages.contact) {
            return (
                <motion.img
                    src="/img/misc-preview.png"
                    alt="Contact Preview"
                    className="w-full h-full object-fit"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            );
        } else if (!hoveredLink) {
            return (
                <>
                    {!isVideoLoaded && renderLoadingPlaceholder()}
                    <motion.video
                        className={`w-full h-full object-cover`}
                        src="/portfolio.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        onLoadedData={() => setIsVideoLoaded(true)}
                    />
                </>
            );
        }
        return renderLoadingPlaceholder();
    }, [hoveredLink, isVideoLoaded, loadedImages]);

    // Remove Suspense if not using lazy loading of components
    return (
        <div>
            {/* Title Text */}
            <div className="fixed top-0 left-0 z-50 p-8">
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-44 h-24 object-contain"
                />
                <div className="text-sm space-y-2 font-ming mt-6">
                    <p>Web Designer</p>
                    <p>Born in 2001, Philippines</p>
                    <p>Based in Vancouver</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-screen h-screen flex items-center justify-center">
                <div className="relative w-full h-full max-w-6xl max-h-screen px-4 flex flex-col lg:flex-row items-center justify-center">
                    {/* Navigation Panel */}
                    <div className="w-full lg:w-80 h-64 lg:h-96 border border-black flex items-center justify-center mb-8 lg:mb-0 lg:mr-16">
                        <ul className="space-y-6 text-lg sm:text-xl text-center font-ming">
                            <motion.li whileHover={{ x: 10 }}>
                                <Link
                                    to="/projects"
                                    className="hover:text-americanred transition-colors"
                                    onMouseEnter={() => handleMouseEnter("projects")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Portfolio
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 10 }}>
                                <Link
                                    to="/about"
                                    className="hover:text-americanred transition-colors"
                                    onMouseEnter={() => handleMouseEnter("about")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    About
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 10 }}>
                                <Link
                                    to="/contact"
                                    className="hover:text-americanred transition-colors"
                                    onMouseEnter={() => handleMouseEnter("contact")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Information
                                </Link>
                            </motion.li>
                        </ul>
                    </div>

                    {/* Media Panel */}
                    <motion.div
                        ref={mediaPanelRef}
                        className="border border-black w-full lg:w-80 h-64 lg:h-96 overflow-hidden relative"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                        style={{
                            perspective: 800,
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        <motion.div
                            className="w-full h-full"
                            style={{
                                transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            {rightPanelContent}
                        </motion.div>
                    </motion.div>

                    {/* Footer Links */}
                    <div className="fixed bottom-0 left-0 p-8 space-y-2 font-ming text-sm">
                        <motion.a whileHover={{ x: 10 }} href="https://www.linkedin.com/in/kevin-l-280314285/" className="block hover:text-americanred transition-colors">
                            LinkedIn
                        </motion.a>
                        <motion.a whileHover={{ x: 10 }} href="https://www.are.na/kevin-lazo/channels" className="block hover:text-americanred transition-colors">
                            Are.na
                        </motion.a>
                        <motion.a whileHover={{ x: 10 }} href="https://www.youtube.com/@dinnereservations/videos" className="block hover:text-americanred transition-colors">
                            YouTube
                        </motion.a>
                    </div>

                    {/* Footer Image */}
                    <div className="fixed bottom-0 right-0">
                        {loadedImages.footer ? (
                            <motion.img
                                src="/footer.png"
                                alt="Creature"
                                className="w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 object-contain"
                                whileHover={{ scale: 1.05 }}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 bg-white" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;