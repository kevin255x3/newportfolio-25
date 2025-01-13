// src/components/ProjectList.jsx

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import PROJECTS from "../data/projectsData";
import "../css/ProjectList.css"; // Import the CSS for hiding scrollbars and scroll snapping


function ProjectList({ onSelectProject }) {
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            e.preventDefault();
            container.scrollLeft += e.deltaY;
        };

        container.addEventListener('wheel', handleWheel, { passive: false });

        return () => {
            container.removeEventListener('wheel', handleWheel);
        };
    }, []);

    return (
        <>
            <motion.div
                className="flex items-center justify-center min-h-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.5 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
                <div
                    ref={scrollContainerRef}
                    className="project-list-container  flex space-x-12 px-8 py-4"
                >
                    {PROJECTS.map((proj) => (
                        <div
                            key={proj.id}
                            className="project-card flex-shrink-0 w-[80%] md:w-[60%] md:w-[40%] lg:w-[30%] transform transition-transform duration-300 hover:scale-105 scroll-snap-align-start"
                        >
                            <div className="project-content">
                                {/* Uniform Square Image Container */}
                                <div className="project-image aspect-square bg-gray-200 overflow-hidden">
                                    <img
                                        src={proj.previewImg}
                                        alt={`${proj.title} preview`}
                                        className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/fallback-image.jpg"; // Path to your fallback image
                                        }}
                                    />
                                </div>

                                {/* Project Info */}
                                <div className="project-info mt-4">
                                    <div className="flex justify-between items-center">
                                        {/* Title aligned left */}
                                        <span className=" text-black text-sm font-ming">
                                            {proj.title}
                                        </span>

                                        {/* View Details aligned right */}
                                        <button
                                            onClick={() => onSelectProject(proj)}
                                            className=" font-ming cursor-pointer hover:text-royal hover:underline focus:outline-none focus:ring-2 focus:ring-americanblue text-sm text-americanred"
                                            aria-label={`View details of ${proj.title}`}
                                        >
                                            View details
                                        </button>
                                    </div>

                                    {/* Subtitle aligned left with padding */}
                                    <p className="mt-2 text-gray-700 text-sm font-ming ">
                                        {proj.subtitle}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

        </>
    );
}

export default ProjectList;
