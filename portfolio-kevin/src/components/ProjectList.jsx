import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import PROJECTS from "../data/projectsData";
import "../css/ProjectList.css";

function ProjectList({ onSelectProject }) {
    const scrollContainerRef = useRef(null);

    // Simplify the visibility tracking
    const [loadedImages, setLoadedImages] = useState(new Set());

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    const handleImageLoad = (projectId) => {
        setLoadedImages(prev => new Set([...prev, projectId]));
    };

    return (
        <motion.div
            className="flex items-center justify-center min-h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div
                ref={scrollContainerRef}
                className="project-list-container flex space-x-12 px-8 py-4"
            >
                {PROJECTS.map((proj) => (
                    <motion.div
                        key={proj.id}
                        className="project-card flex-shrink-0 w-[80%] md:w-[60%] lg:w-[30%]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="project-content">
                            <div className="project-image aspect-square bg-gray-200 overflow-hidden relative">
                                {/* Always show loading placeholder until image loads */}
                                {!loadedImages.has(proj.id) && (
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                                )}

                                {/* Always try to load the image */}

                                <img
                                    src={Array.isArray(proj.previewImg) ? proj.previewImg[0].url : proj.previewImg}
                                    alt={`${proj.title} preview`}
                                    className={`w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300 ${loadedImages.has(proj.id) ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    loading="lazy"
                                    onLoad={() => handleImageLoad(proj.id)}
                                    onError={(e) => {
                                        console.error(`Failed to load image for project: ${proj.title}`);
                                        e.target.src = '/fallback-image.jpg';
                                    }}
                                />
                            </div>

                            <div className="project-info mt-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-black text-sm font-ming">
                                        {proj.title}
                                    </span>
                                    <button
                                        onClick={() => onSelectProject(proj)}
                                        className="font-ming cursor-pointer hover:text-royal hover:underline focus:outline-none focus:ring-2 focus:ring-americanblue text-sm text-americanred"
                                        aria-label={`View details of ${proj.title}`}
                                    >
                                        View details
                                    </button>
                                </div>
                                <p className="mt-2 text-gray-700 text-sm font-ming">
                                    {proj.subtitle}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}

export default ProjectList;