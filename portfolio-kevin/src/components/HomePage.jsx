import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// landing page component set to default route in App.js
// responsive update - feb 4 2025, on mobile screens only the menu is displayed and everything else is hidden.

function HomePage() {
    // state managers
    // tracks which link is hovered
    const [hoveredLink, setHoveredLink] = React.useState(null);
    // manages videos for hover interactions, transitions to relevant hovered link content
    const [isVideoLoaded, setIsVideoLoaded] = React.useState(false);
    // track loaded images to show appropiate content
    const [loadedImages, setLoadedImages] = React.useState({});
    // slight skew effect, tracked by the mouse positiona
    const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });

    //elements on the dom for access
    const mediaPanelRef = React.useRef(null);
    const videoRef = React.useRef(null);

    // image loading

    // preloads images to prevent lag and layout shifts
    React.useEffect(() => {
        const imagePaths = {
            projects: '/baldy.jpg',
            about: '/img/who-preview.png',
            contact: '/img/misc-preview.png',
            footer: '/footer.png'
        };

        // loads images and updates setLoadedImages state when complete
        Object.entries(imagePaths).forEach(([key, path]) => {
            const img = new Image();
            img.onload = () => setLoadedImages(prev => ({ ...prev, [key]: true }));
            img.src = path;
        });
    }, []);


    // video loading
    // handles video playback, video looping, and video errors
    React.useEffect(() => {
        if (videoRef.current) {
            const playVideo = () => {
                videoRef.current.play().catch(error => {
                    console.error('Video playback failed:', error);
                });
            };

            // event listener when unmounted to play the video again, for smooth hover effect transitions
            playVideo();
            videoRef.current.addEventListener('ended', playVideo);

            return () => {
                if (videoRef.current) {
                    videoRef.current.removeEventListener('ended', playVideo);
                }
            };
        }
    }, [hoveredLink]);

    // 3d rotation effect, more subtle, taking inspiration from my first portfolio.
    // rotation is calculated based on the mouse position relative to the media panel (container)
    const handleMouseMove = (e) => {
        if (!mediaPanelRef.current) return;

        const rect = mediaPanelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // rotation calculates betwween -15 to 15 degrees
        const rotateY = ((x / rect.width) - 0.5) * 30;
        const rotateX = ((y / rect.height) - 0.5) * -30;

        setMousePosition({ x: rotateY, y: rotateX });
    };

    // link hover handlers

    // memorized to prevent uneccesary re-renders
    const handleMouseEnter = React.useCallback((linkName) => {
        setHoveredLink(linkName);
    }, []);

    const handleMouseLeave = React.useCallback(() => {
        setHoveredLink(null);
    }, []);

    // media panel content (the box)
    1   // manages content switching and loading states
    const rightPanelContent = React.useMemo(() => {
        // loading placeholder
        const renderLoadingPlaceholder = () => (
            <div className="w-full h-full bg-gray-200 animate-pulse" />
        );

        // contditional rendering based on hovered link
        if (hoveredLink === "projects" && loadedImages.projects) {
            return (
                <motion.img
                    src="/baldy.jpg"
                    alt="Projects Preview"
                    className="w-full h-full object-cover"
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
                    className="w-full h-full object-cover"
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                />
            );
        } else if (!hoveredLink) {
            // default content displayed if no link is hovered
            return (
                <>
                    {!isVideoLoaded && renderLoadingPlaceholder()}
                    <motion.video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        src="/portfolio2.mp4"
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="lazy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isVideoLoaded ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        onLoadedData={() => {
                            setIsVideoLoaded(true);
                            videoRef.current.play().catch(error => {
                                console.error('Video playback failed:', error);
                            });
                        }}
                    />
                </>
            );
        }
        return renderLoadingPlaceholder();
    }, [hoveredLink, isVideoLoaded, loadedImages]);

    return (
        <div className="min-h-screen w-full overflow-hidden">
            {/* header section with logo and information */}
            <motion.div
                className="fixed top-0 left-0 z-50 p-8 transition-opacity duration-300 md:opacity-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <img
                    src="/logo.png"
                    alt="logo"
                    className="w-32 h-16 md:w-44 md:h-24 object-contain transition-all duration-300"
                />
                {/*  personal information - not visible on mobile */}
                <div className="hidden md:block text-sm space-y-2 font-ming mt-6">
                    <p>Web Designer</p>
                    <p>Born in 2001, Philippines</p>
                    <p>Based in Vancouver</p>
                </div>
            </motion.div>

            {/* main content */}
            <div className="w-full min-h-screen flex items-center justify-center px-4">
                <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 transition-all duration-300">
                    {/* main navigation links */}
                    <motion.div
                        className="w-full md:w-80 h-screen md:h-96 flex items-center justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/*  navigation items with hover effects */}
                        <ul className="space-y-6 text-xl md:text-2xl text-center font-ming">
                            <motion.li whileHover={{ x: 10 }} className="transition-all duration-300">
                                <Link
                                    to="/projects"
                                    className="hover:text-americanred transition-colors duration-300"
                                    onMouseEnter={() => handleMouseEnter("projects")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Portfolio
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 10 }} className="transition-all duration-300">
                                <Link
                                    to="/about"
                                    className="hover:text-americanred transition-colors duration-300"
                                    onMouseEnter={() => handleMouseEnter("about")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    About
                                </Link>
                            </motion.li>
                            <motion.li whileHover={{ x: 10 }} className="transition-all duration-300">
                                <Link
                                    to="/contact"
                                    className="hover:text-americanred transition-colors duration-300"
                                    onMouseEnter={() => handleMouseEnter("contact")}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    Information
                                </Link>
                            </motion.li>
                        </ul>
                    </motion.div>

                    {/* media panel - hidden on mobile*/}
                    <motion.div
                        ref={mediaPanelRef}
                        className="hidden md:block border border-black w-full md:w-80 h-96 overflow-hidden relative"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
                        style={{
                            perspective: 800,
                            transformStyle: 'preserve-3d'
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/*  media container */}
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

                    {/* footer links, hidden on mobile */}
                    <motion.div
                        className="fixed bottom-0 left-0 p-8 space-y-2 font-ming text-sm hidden md:block"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <motion.a whileHover={{ x: 10 }} href="https://www.linkedin.com/in/kevin-l-280314285/" className="block hover:text-americanred transition-colors duration-300">
                            LinkedIn
                        </motion.a>
                        <motion.a whileHover={{ x: 10 }} href="https://www.are.na/kevin-lazo/channels" className="block hover:text-americanred transition-colors duration-300">
                            Are.na
                        </motion.a>
                        <motion.a whileHover={{ x: 10 }} href="https://www.youtube.com/@dinnereservations/videos" className="block hover:text-americanred transition-colors duration-300">
                            YouTube
                        </motion.a>
                    </motion.div>

                    {/* footer image - hidden on mobile */}
                    <motion.div
                        className="fixed bottom-0 right-0 hidden md:block"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {loadedImages.footer ? (
                            <motion.img
                                src="/footer.png"
                                alt="Creature"
                                className="w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 object-contain transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-48 sm:w-64 lg:w-80 h-48 sm:h-64 lg:h-96 bg-white" />
                        )}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;