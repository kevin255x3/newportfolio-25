// ProjectDetails.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, ArrowRight } from 'lucide-react';
import ProcessTimeline from "./ProcessTimeline";

function ProjectDetails({ project, onBack }) {
    const [activeMedia, setActiveMedia] = useState(0);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVideo, setIsVideo] = useState(false);
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
        // Check if current media is video
        const currentMedia = mediaArray[activeMedia];
        setIsVideo(currentMedia.type === 'video' || (typeof currentMedia === 'string' && currentMedia.endsWith('.mp4')));
    }, [activeMedia]);

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
        if (!Array.isArray(project.media)) return;
        setActiveMedia((prev) => (prev + 1) % project.media.length);
        setIsMediaLoading(true);
    };

    const handlePrevMedia = () => {
        if (!Array.isArray(project.media)) return;
        setActiveMedia((prev) => (prev - 1 + project.media.length) % project.media.length);
        setIsMediaLoading(true);
    };

    const mediaArray = Array.isArray(project.media)
        ? project.media
        : [{ url: project.media, type: project.media?.endsWith('.mp4') ? 'video' : 'image' }];

    return (
        <motion.div
            className="fixed inset-0 bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header - Now responsive */}
            <div className="fixed top-0 left-0 right-0 z-50 flex h-12 flex-wrap sm:flex-nowrap">
                <button
                    onClick={onBack}
                    className="bg-black text-white px-4 hover:bg-americanred transition-colors flex items-center gap-2 w-full sm:w-auto"
                >
                    <X className="w-4 h-4" />
                    <span className="font-ming text-sm">EXIT</span>
                </button>
                <div className="flex-1 bg-white px-4 font-ming text-sm flex items-center overflow-hidden">
                    <span className="truncate">{project.title} / {project.subtitle}</span>
                </div>
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-americanblue text-white px-4 hover:bg-americanred transition-colors flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <span className="font-ming text-sm">VIEW</span>
                        <ArrowRight className="w-4 h-4" />
                    </a>
                )}
            </div>

            <div className="h-screen overflow-hidden pt-12">
                <div className="flex flex-col md:flex-row h-full">
                    {/* Left - Media Viewer */}
                    <div className="md:w-2/3 h-full relative bg-white">
                        <motion.div
                            ref={mediaPanelRef}
                            className="w-full h-full flex items-center justify-center"
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
                                {/* Media loading spinner */}
                                <AnimatePresence>
                                    {isMediaLoading && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75"
                                        >
                                            <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
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

                        {/* Media Navigation */}
                        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-black">
                            <div className="flex overflow-x-auto scrollbar-hide">
                                {mediaArray.map((media, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setActiveMedia(index);
                                            setIsMediaLoading(true);
                                        }}
                                        className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative border-r border-black
                                            ${activeMedia === index ? 'bg-black' : 'hover:bg-gray-50'}`}
                                    >
                                        <img
                                            src={typeof media === 'string' ? media : media.url}
                                            alt=""
                                            className={`w-full h-full object-cover 
                                                ${activeMedia === index ? 'opacity-50' : ''}`}
                                        />
                                        {media.type === 'video' && (
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Play className={`w-4 h-4 ${activeMedia === index ? 'text-white' : 'text-black'}`} />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="md:w-1/3 h-full overflow-y-auto border-l border-black">
                        <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                            <div className="space-y-2 pb-6 border-b border-black">
                                <h1 className="text-xl sm:text-2xl font-ming">{project.title}</h1>
                                <p className="font-ming text-sm sm:text-base">{project.subtitle}</p>
                            </div>

                            <div>
                                <h2 className="text-sm font-ming mb-3">SOFTWARE & SKILLS</h2>
                                <div className="flex flex-wrap gap-2">
                                    {project.software.split(',').map((skill, index) => (
                                        <span
                                            key={index}
                                            className="px-2 py-1 border border-black text-xs font-ming hover:bg-black hover:text-white transition-colors"
                                        >
                                            {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="prose prose-sm">
                                <p className="leading-relaxed">{project.description}</p>
                                {project.notes && (
                                    <p className="mt-4 text-sm border-l-2 border-black pl-4">{project.notes}</p>
                                )}
                            </div>

                            <div className="pt-6 border-t border-black">
                                <h2 className="text-sm font-ming mb-6 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    PROCESS TIMELINE
                                </h2>
                                <ProcessTimeline project={project} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export default ProjectDetails;