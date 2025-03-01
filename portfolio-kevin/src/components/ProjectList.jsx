import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import PROJECTS from "../data/projectsData";

function ProjectList({ onSelectProject }) {
    const scrollContainerRef = useRef(null);
    const [loadedImages, setLoadedImages] = useState(new Set());
    const [loadedVideos, setLoadedVideos] = useState(new Set());
    const [scrollPosition, setScrollPosition] = useState(0);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [hoveredProjects, setHoveredProjects] = useState(new Set());
    const videoRefs = useRef({});

    const handleImageLoad = useCallback((projectId) => {
        setLoadedImages(prev => new Set([...prev, projectId]));
    }, []);

    const handleVideoLoad = useCallback((projectId) => {
        setLoadedVideos(prev => new Set([...prev, projectId]));
    }, []);

    const handleScroll = useCallback((e) => {
        const container = e.target;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const currentScroll = container.scrollLeft;
        setScrollPosition((currentScroll / maxScroll) * 100);

        const projectWidth = container.clientWidth * 0.7;
        const newIndex = Math.round(currentScroll / projectWidth);
        setCurrentProjectIndex(Math.max(0, Math.min(newIndex, PROJECTS.length - 1)));
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            const scrollAmount = (e.deltaX !== 0 ? e.deltaX : e.deltaY) * 2.5;
            container.scrollLeft += scrollAmount;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

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

    const handleProjectHover = (projectId, isHovering) => {
        if (isHovering) {
            setHoveredProjects(prev => new Set([...prev, projectId]));
            const videoRef = videoRefs.current[projectId];
            if (videoRef) {
                videoRef.play().catch(err => console.log("Video autoplay prevented:", err));
            }
        } else {
            setHoveredProjects(prev => {
                const newSet = new Set([...prev]);
                newSet.delete(projectId);
                return newSet;
            });
            const videoRef = videoRefs.current[projectId];
            if (videoRef) {
                videoRef.pause();
                videoRef.currentTime = 0;
            }
        }
    };

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

    const renderProjectMedia = (proj) => {
        const isHovered = hoveredProjects.has(proj.id);

        if (proj.previewVideo && isHovered) {
            return (
                <div className="relative w-full h-full">
                    {!loadedVideos.has(proj.id) && (
                        <motion.div
                            className="absolute inset-0 bg-gray-200"
                            animate={{ opacity: [0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                        />
                    )}
                    <video
                        ref={ref => videoRefs.current[proj.id] = ref}
                        src={proj.previewVideo}
                        muted
                        playsInline
                        loop
                        controls={false}
                        style={{ pointerEvents: 'none' }}
                        className="w-full h-full object-cover object-center transition-all duration-500"
                        onLoadedData={() => handleVideoLoad(proj.id)}
                    />
                </div>
            );
        }

        // Return image for non-video projects or when not hovered
        return (
            <div className="relative w-full h-full">
                {!loadedImages.has(proj.id) && (
                    <motion.div
                        className="absolute inset-0 bg-gray-200"
                        animate={{ opacity: [0.5, 1] }}
                        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    />
                )}
                <img
                    src={Array.isArray(proj.previewImg) ? proj.previewImg[0].url : proj.previewImg}
                    alt={`${proj.title} preview`}
                    className={`
                        w-full h-full object-cover object-center transition-all duration-500
                        filter ${isHovered ? 'grayscale-0' : 'grayscale hover:grayscale-0'}
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
        );
    };

    return (
        <motion.div
            className="flex flex-col items-center justify-center min-h-screen relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            {/* Navigation buttons */}
            <div className="fixed left-4 right-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-10">
                <button
                    onClick={() => scrollToDirection('prev')}
                    className={`pointer-events-auto p-2 bg-white shadow-lg transition-opacity duration-300 
                        ${currentProjectIndex === 0 ? 'opacity-0' : 'opacity-100'}`}
                    disabled={currentProjectIndex === 0}
                    aria-label="Previous project"
                >
                    ←
                </button>
                <button
                    onClick={() => scrollToDirection('next')}
                    className={`pointer-events-auto p-2 bg-white shadow-lg transition-opacity duration-300 
                        ${currentProjectIndex === PROJECTS.length - 1 ? 'opacity-0' : 'opacity-100'}`}
                    disabled={currentProjectIndex === PROJECTS.length - 1}
                    aria-label="Next project"
                >
                    →
                </button>
            </div>

            {/* Progress bar */}
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-200 overflow-hidden">
                <motion.div
                    className="h-full bg-americanred"
                    style={{ width: `${scrollPosition}%` }}
                />
            </div>

            {/* Project container */}
            <div
                ref={scrollContainerRef}
                onScroll={handleScroll}
                className="w-full overflow-x-auto flex gap-8 px-4 py-8 items-start
                    scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent select-none "
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {PROJECTS.map((proj, index) => (
                    <motion.div
                        key={proj.id}
                        className="flex-shrink-0 w-[90%] sm:w-[70%] md:w-[45%] lg:w-[30%]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        tabIndex={0}
                        role="button"
                        aria-label={`Open details for ${proj.title}`}
                    >
                        <div
                            className="group cursor-pointer"
                            onMouseEnter={() => handleProjectHover(proj.id, true)}
                            onMouseLeave={() => handleProjectHover(proj.id, false)}
                            onClick={() => onSelectProject(proj)}
                        >
                            <div className="relative aspect-square bg-gray-100 overflow-hidden z-0 flex items-center justify-center">
                                {renderProjectMedia(proj)}
                            </div>
                            <div className="mt-4 space-y-2">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-black text-sm font-ming">
                                        {proj.title}
                                    </h3>
                                    <motion.button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            e.preventDefault();
                                            onSelectProject(proj);
                                        }}
                                        className="text-sm font-ming text-americanred hover:text-royal 
                                         transition-colors duration-300 px-2 py-1
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

            {/* Instructions */}
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