import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, ArrowRight } from 'lucide-react';
import ProcessTimeline from "./ProcessTimeline";

function ProjectDetails({ project, onBack }) {
    const [activeMedia, setActiveMedia] = useState(0);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVideo, setIsVideo] = useState(false);
    const [showDetailsMobile, setShowDetailsMobile] = useState(false);
    const mediaPanelRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onBack();
            if (e.key === 'ArrowRight') handleNextMedia();
            if (e.key === 'ArrowLeft') handlePrevMedia();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onBack]);

    useEffect(() => {
        const currentMedia = project.media[activeMedia];
        setIsVideo(currentMedia?.type === 'video' || (typeof currentMedia === 'string' && currentMedia.endsWith('.mp4')));
    }, [activeMedia, project.media]);

    const handleMouseMove = (e) => {
        if (!mediaPanelRef.current || isVideo) return;
        const rect = mediaPanelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 30;
        const rotateX = ((y / rect.height) - 0.5) * -30;
        setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => {
        setMousePosition({ x: 0, y: 0 });
    };

    const handleNextMedia = () => {
        setActiveMedia((prev) => (prev + 1) % project.media.length);
        setIsMediaLoading(true);
    };

    const handlePrevMedia = () => {
        setActiveMedia((prev) => (prev - 1 + project.media.length) % project.media.length);
        setIsMediaLoading(true);
    };

    const mediaArray = Array.isArray(project.media) ? project.media :
        [{ url: project.media, type: project.media?.endsWith('.mp4') ? 'video' : 'image' }];

    return (
        <motion.div
            className="fixed inset-0 bg-white z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header */}
            <div className="flex-none h-12 flex items-center justify-between border-b border-black/10">
                <motion.button
                    onClick={onBack}
                    className="h-full px-4 font-ming text-sm flex items-center gap-2 hover:text-americanred"
                    whileHover={{ x: -5 }}
                >
                    <X className="w-4 h-4" />
                    <span>Exit</span>
                </motion.button>

                <h1 className="font-ming text-sm">
                    <span className="text-americanred">{project.title}</span>
                    <span className="mx-2">/</span>
                    <span className="hidden sm:inline">{project.subtitle}</span>
                </h1>

                <div className="flex items-center">
                    <motion.button
                        onClick={() => setShowDetailsMobile(!showDetailsMobile)}
                        className="md:hidden h-full px-4 font-ming text-sm"
                        whileHover={{ x: 5 }}
                    >
                        {showDetailsMobile ? "View Media" : "View Details"}
                    </motion.button>

                    {project.link && (
                        <motion.a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="h-full px-4 font-ming text-sm flex items-center gap-2 hover:text-americanred"
                            whileHover={{ x: 5 }}
                        >
                            <span>View</span>
                            <ArrowRight className="w-4 h-4" />
                        </motion.a>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                {/* Media Section */}
                <div className={`flex-1 md:w-2/3 relative ${showDetailsMobile ? 'hidden md:block' : 'flex flex-col'}`}>
                    <motion.div
                        ref={mediaPanelRef}
                        className="flex-1 flex items-center justify-center overflow-hidden"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            perspective: isVideo ? 'none' : 800,
                            transformStyle: isVideo ? 'flat' : 'preserve-3d'
                        }}
                    >
                        <motion.div
                            className="w-full h-full flex items-center justify-center"
                            style={{
                                transform: isVideo ? 'none' : `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                                transition: 'transform 0.2s ease-out'
                            }}
                        >
                            <AnimatePresence>
                                {isMediaLoading && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 flex items-center justify-center bg-white"
                                    >
                                        <div className="w-8 h-8 border-2 border-americanred border-t-transparent rounded-full animate-spin" />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="relative w-full h-full flex items-center justify-center p-4">
                                {mediaArray[activeMedia].type === 'video' ? (
                                    <video
                                        key={mediaArray[activeMedia].url}
                                        src={mediaArray[activeMedia].url}
                                        controls
                                        className="max-h-full w-auto object-contain"
                                        onLoadedData={() => setIsMediaLoading(false)}
                                    />
                                ) : (
                                    <img
                                        src={mediaArray[activeMedia].url}
                                        alt={mediaArray[activeMedia].caption || project.title}
                                        className="max-h-full w-auto object-contain"
                                        onLoad={() => setIsMediaLoading(false)}
                                    />
                                )}
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Thumbnails */}
                    <div className="flex-none border-t border-black/10">
                        <div className="flex overflow-x-auto scrollbar-hide">
                            {mediaArray.map((media, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => {
                                        setActiveMedia(index);
                                        setIsMediaLoading(true);
                                    }}
                                    className={`flex-shrink-0 w-16 h-16 relative border-r border-black/10
                                        ${activeMedia === index ? 'bg-black/5' : 'hover:bg-black/5'}`}
                                    whileHover={{ scale: 0.95 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <img
                                        src={typeof media === 'string' ? media : media.url}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    {media.type === 'video' && (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Play className="w-4 h-4 text-white" />
                                        </div>
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Details Section */}
                <div
                    className={`md:w-1/3 border-l border-black/10 
                        ${!showDetailsMobile ? 'hidden md:block' : 'flex-1'} 
                        overflow-y-auto`}
                >
                    <div className="p-4 md:p-6 space-y-6 md:space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-xl font-ming text-americanred">{project.title}</h1>
                            <p className="font-ming text-sm">{project.subtitle}</p>
                        </div>

                        <div>
                            <h2 className="text-sm font-ming mb-3 text-americanred">Software & Skills</h2>
                            <div className="flex flex-wrap gap-2">
                                {project.software.split(',').map((skill, index) => (
                                    <motion.span
                                        key={index}
                                        className="px-2 py-1 text-xs font-ming hover:text-americanred"
                                        whileHover={{ x: 5 }}
                                    >
                                        {skill.trim()}
                                    </motion.span>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-4">
                            <p className="text-sm font-helvetica leading-relaxed">
                                {project.description}
                            </p>
                            {project.notes && (
                                <p className="text-xs font-helvetica text-gray-600">
                                    {project.notes}
                                </p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-sm font-ming mb-6 flex items-center gap-2 text-americanred">
                                <Clock className="w-4 h-4" />
                                Process Timeline
                            </h2>
                            <ProcessTimeline project={project} />
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectDetails;