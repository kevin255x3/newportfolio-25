import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, ChevronDown, Clock, ArrowRight } from 'lucide-react';
import ProcessTimeline from "./ProcessTimeline";

// ProcessSteps component - Add this inside the same file


function ProjectDetails({ project, onBack }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onBack();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [onBack]);

    return (
        <motion.div
            className="fixed inset-0 bg-white bg-opacity-95 z-50 overflow-y-auto p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
        >
            {/* Back Button */}
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="border border-americanblue px-4 py-2 hover:bg-gray-100 font-ming tracking-wider focus:outline-none focus:ring-2 focus:ring-americanblue"
                    aria-label="Back to Projects"
                >
                    &larr; Back to Projects
                </button>
            </div>

            <div className="mx-auto w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Kept the same */}
                <div className="col-span-1 space-y-6 border border-americanbluelight p-4">
                    {/* ... (keep existing left column code) ... */}
                    {/* Title / Subtitle */}
                    <div>
                        <h2
                            id={`project-title-${project.id}`}
                            className="text-xl  text-gray-900 font-ming tracking-wider"
                        >
                            {project.title}
                        </h2>
                        <p className="text-black font-ming tracking-wider">
                            {project.subtitle}
                        </p>
                    </div>

                    {/* Software/Skills */}
                    <div>
                        <h3 className="text-base  text-black font-ming tracking-wider mb-1">
                            Software / Skills
                        </h3>
                        <p className="text-black text-sm font-helvetica">{project.software}</p>
                    </div>

                    {/* Notes / Link */}
                    <div>
                        <h3 className="text-base  text-black font-ming tracking-wider mb-1">
                            Additional Info
                        </h3>
                        {project.notes ? (
                            <p className="text-black text-sm font-helvetica">{project.notes}</p>
                        ) : (
                            <p className="text-gray-500 italic text-sm">
                                No additional notes provided.
                            </p>
                        )}

                        {project.link && (
                            <div className="mt-3">
                                <button className="border border-americanblue px-4 py-2 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-americanblue">
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-americanblue underline"
                                    >
                                        View the Project
                                    </a>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Columns */}
                <div className="md:col-span-2 space-y-6">
                    {/* Description */}
                    <div className="border border-americanbluelight p-4">
                        <h2 className="font-ming tracking-wider  text-lg text-black mb-2">
                            Description
                        </h2>
                        <p className="text-black text-sm leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    {/* New Process Section */}
                    <div className="border border-americanbluelight p-4">
                        <h2 className="font-ming font-semibold text-lg text-black mb-4 flex items-center gap-2">
                            <Clock className="w-5 h-5" />
                            Process Journey
                        </h2>
                        <ProcessTimeline project={project} />
                    </div>

                    {/* Media Section */}
                    <div className="border border-americanblue p-4">
                        <h2 className="font-ming tracking-wider  text-lg text-black mb-2">
                            Media
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="bg-gray-100 flex items-center justify-center p-2">
                                {project.media.endsWith(".mp4") ? (
                                    <video
                                        src={project.media}
                                        controls
                                        className="w-full h-auto object-cover"
                                    />
                                ) : (
                                    <img
                                        src={project.media}
                                        alt="Media"
                                        className="w-full h-auto object-cover"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = "/fallback-image.jpg";
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectDetails;