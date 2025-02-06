import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import PROJECTS from "../data/projectsData";

// project list component 1/3 components that builds the project view

// ensure usability with keyboard, drag and mouse controls
// updated responsiveness on feb 4 2025
// image loading management
function ProjectList({ onSelectProject }) {
    // references and state managers
    const scrollContainerRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    // image loading handler
    // updates loadingImages state when each image is loaded
    const handleImageLoad = useCallback((projectId) => {
        setLoadedImages(prev => new Set([...prev, projectId]));
    }, []);

    // scroll position tracking
    // updates progress bar and current project index
    const handleScroll = useCallback((e) => {
        const container = e.target;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        setScrollPosition((currentScroll / maxScroll) * 100);

        // updates current project index for keyboard navigation
        const projectWidth = container.clientWidth * 0.7; // approximate width of a project
        const newIndex = Math.round(currentScroll / projectWidth);
        setCurrentProjectIndex(Math.max(0, Math.min(newIndex, PROJECTS.length - 1)));
    }, []);

    // horizontal mousewheel scrolling if available
    // also enables horizontal scrolling with vertical mouse wheel
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();

            // Determine which delta to use and multiply it for faster scrolling
            // The multiplier (2.5 here) controls the scroll speed - adjust as needed
            const scrollAmount = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 2.5;

            // Direct scroll without smooth behavior for more responsive feel
            container.scrollLeft += scrollAmount;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    // keyboard navigation
    // enables left and right controls to navigate project list
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!scrollContainerRef.current) return;

            const container = scrollContainerRef.current;
            const projectWidth = container.clientWidth * 0.7;

            if (e.key === 'ArrowRight' && currentProjectIndex < PROJECTS.length - 1) {
                container.scrollTo({
                    left: (currentProjectIndex + 1) * projectWidth,
                    behavior: 'smooth'
                });
                setCurrentProjectIndex(prev => Math.min(prev + 1, PROJECTS.length - 1));
            } else if (e.key === 'ArrowLeft' && currentProjectIndex > 0) {
                container.scrollTo({
                    left: (currentProjectIndex - 1) * projectWidth,
                    behavior: 'smooth'
                });
                setCurrentProjectIndex(prev => Math.max(prev - 1, 0));
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentProjectIndex]);

    // click handler for project details
    const handleProjectClick = (proj) => {
        onSelectProject(proj);
    };

    // navigation button handler
    // scrolls to next / previous project
    const scrollToDirection = (direction) => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const projectWidth = container.clientWidth * 0.7;
        const newIndex = direction === 'next'
            ? Math.min(currentProjectIndex + 1, PROJECTS.length - 1)
            : Math.max(currentProjectIndex - 1, 0);

        container.scrollTo({
            left: newIndex * projectWidth,
            behavior: 'smooth'
        });
        setCurrentProjectIndex(newIndex);
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* navigation buttons - hidden when scroll hits limit */}
            <div className="fixed left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <button
                    onClick={() => scrollToDirection('prev')}
                    className={`pointer-events-auto p-2  bg-white shadow-lg transition-opacity duration-300 ${currentProjectIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
                    disabled={currentProjectIndex === 0}
                    aria-label="Previous project"
                >
                    ←
                </button>
                <button
                    onClick={() => scrollToDirection('next')}
                    className={`pointer-events-auto p-2  bg-white shadow-lg transition-opacity duration-300 ${currentProjectIndex === PROJECTS.length - 1 ? 'opacity-0' : 'opacity-100'}`}
                    disabled={currentProjectIndex === PROJECTS.length - 1}
                    aria-label="Next project"
                >
                    →
                </button>
            </div>

            {/* scroll progress indicator */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-200  overflow-hidden">
                <motion.div
                    className="h-full bg-americanred"
                    style={{ width: `${scrollPosition}%` }}
                />
            </div>

            {/* project container with snap on scroll */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className={`
                    w-full overflow-x-auto flex gap-8 px-4 py-8 items-start
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
                     select-none
                   
                `}
                style={{
                    WebkitOverflowScrolling: 'touch',

                }}
            >
                {/* project card layout renders project data from projectsData.js */}
                {PROJECTS.map((proj, index) => (
                    <motion.div
                        key={proj.id}
                        className="flex-shrink-0 w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        tabIndex={0}
                        onClick={() => handleProjectClick(proj)}
                        role="button"
                        aria-label={`Open details for ${proj.title}`}
                    >
                        {/* image */}
                        <div className="group cursor-pointer">
                            <div
                                className="relative aspect-square bg-gray-100 overflow-hidden"
                            >
                                {/* image loading placeholder */}
                                {!loadedImages.has(proj.id) && (
                                    <motion.div
                                        className="absolute inset-0 bg-gray-200"
                                        animate={{ opacity: [0.5, 1] }}
                                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                    />
                                )}
                                {/*  project image with loading state */}
                                <img
                                    src={Array.isArray(proj.previewImg) ? proj.previewImg[0].url : proj.previewImg}
                                    alt={`${proj.title} preview`}
                                    className={`
                                        w-full h-full object-cover transition-all duration-500
                                        filter grayscale hover:grayscale-0
                                        ${loadedImages.has(proj.id) ? 'opacity-100' : 'opacity-0'}
                                    `}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(proj.id)}
                                    onError={(e) => {
                                        console.error(`Failed to load image for project: ${proj.title}`);
                                        e.target.src = '/fallback-image.jpg';
                                    }}
                                />
                            </div>
                            {/* project information */}
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-black text-sm font-ming">
                                        {proj.title}
                                    </h3>
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectProject(proj);
                                        }}
                                        className="text-sm font-ming text-americanred hover:text-royal 
                                                 transition-colors duration-300  px-2 py-1
                                                 focus:outline-none focus:ring-2 focus:ring-americanblue"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        View details
                                    </motion.button>
                                </div>
                                <p className="text-gray-700 text-sm font-ming">
                                    {proj.subtitle}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* usability instructions */}
            <motion.div
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-sm font-ming text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Use arrow keys or scroll to navigate
            </motion.div>
        </motion.div>
    );
}

export default ProjectList;