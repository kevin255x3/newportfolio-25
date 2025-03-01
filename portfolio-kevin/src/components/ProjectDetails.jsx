import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, Clock, ArrowRight, Code, MessagesSquare, Maximize2 } from 'lucide-react';
import ProcessTimeline from "./ProcessTimeline";

function ProjectDetails({ project, onBack }) {
    const [activeMedia, setActiveMedia] = useState(0);
    const [isMediaLoading, setIsMediaLoading] = useState(true);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isVideo, setIsVideo] = useState(false);
    const [showDetailsMobile, setShowDetailsMobile] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [fullSizeImage, setFullSizeImage] = useState(null);
    const mediaPanelRef = useRef(null);

    // Normalize media array
    const mediaArray = Array.isArray(project.media) ? project.media :
        [{ url: project.media, type: project.media?.endsWith('.mp4') ? 'video' : 'image' }];

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                if (fullSizeImage) {
                    setFullSizeImage(null);
                } else {
                    onBack();
                }
            }
            if (e.key === 'ArrowRight') handleNextMedia();
            if (e.key === 'ArrowLeft') handlePrevMedia();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onBack, fullSizeImage]);

    useEffect(() => {
        const currentMedia = mediaArray[activeMedia];
        const isVideoMedia = currentMedia?.type === 'video' ||
            (currentMedia?.url && currentMedia.url.endsWith('.mp4')) ||
            (typeof currentMedia === 'string' && currentMedia.endsWith('.mp4'));
        setIsVideo(isVideoMedia);
        setIsMediaLoading(true);
    }, [activeMedia, mediaArray]);

    const handleMouseMove = (e) => {
        if (!mediaPanelRef.current || isVideo) return;
        const rect = mediaPanelRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateY = ((x / rect.width) - 0.5) * 30;
        const rotateX = ((y / rect.height) - 0.5) * -30;
        setMousePosition({ x: rotateY, y: rotateX });
    };

    const handleMouseLeave = () => setMousePosition({ x: 0, y: 0 });

    const handleNextMedia = () => {
        setActiveMedia((prev) => (prev + 1) % mediaArray.length);
    };

    const handlePrevMedia = () => {
        setActiveMedia((prev) => (prev - 1 + mediaArray.length) % mediaArray.length);
    };

    const getMediaUrl = (media) => {
        if (typeof media === 'string') return media;
        return media.url;
    };

    const isVideoMedia = (media) => {
        return media.type === 'video' ||
            (media.url && media.url.endsWith('.mp4')) ||
            (typeof media === 'string' && media.endsWith('.mp4'));
    };

    const renderMediaContent = () => {
        const currentMedia = mediaArray[activeMedia];
        const mediaUrl = getMediaUrl(currentMedia);

        if (isVideo) {
            return (
                <video
                    key={mediaUrl}
                    src={mediaUrl}
                    controls
                    className="max-h-full w-auto object-contain"
                    poster={project.previewImg}
                    onLoadedData={() => setIsMediaLoading(false)}
                    style={{ pointerEvents: 'auto' }}
                />
            );
        }

        return (
            <img
                src={mediaUrl}
                alt={currentMedia.caption || project.title}
                className="max-h-full w-auto object-contain"
                onLoad={() => setIsMediaLoading(false)}
            />
        );
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'overview':
                return (
                    <div className="space-y-6">
                        <div className="space-y-4">
                            <p className="text-sm font-helvetica leading-relaxed">
                                {project.description}
                            </p>
                            {project.overview && (
                                <div className="space-y-4">
                                    {project.overview.map((section, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <h3 className="text-sm font-ming text-americanred">{section.title}</h3>
                                            <p className="text-sm font-helvetica leading-relaxed">
                                                {section.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            )}
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

                        {project.notes && (
                            <p className="text-xs font-helvetica text-gray-600">
                                {project.notes}
                            </p>
                        )}
                    </div>
                );

            case 'wireframes':
                return project.wireframes ? (
                    <div className="space-y-8">
                        {project.wireframes.map((wireframe, idx) => (
                            <motion.div
                                key={idx}
                                className="space-y-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                            >
                                <div
                                    className="relative aspect-[16/9] bg-black/5  overflow-hidden cursor-pointer group"
                                    onClick={() => setFullSizeImage(wireframe.fullSizeImage || wireframe.image)}
                                >
                                    <img
                                        src={wireframe.image}
                                        alt={wireframe.title}
                                        className="w-full h-full object-cover transition-transform duration-300
                                                 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100
                                                  transition-opacity duration-300 flex items-center justify-center">
                                        <Maximize2 className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-sm font-ming text-americanred">{wireframe.title}</h3>
                                    <p className="text-sm font-helvetica text-gray-600">{wireframe.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : null;

            case 'technical':
                return (
                    <div className="space-y-6">
                        {project.technical?.sections?.map((section, idx) => (
                            <div key={idx} className="space-y-3">
                                <h2 className="text-sm font-ming text-americanred">{section.title}</h2>
                                <p className="text-sm font-helvetica leading-relaxed">{section.content}</p>
                                {section.details && (
                                    <ul className="list-none space-y-2">
                                        {section.details.map((detail, index) => (
                                            <li key={index} className="font-helvetica text-sm flex items-start gap-2">
                                                <span className="text-americanred/75">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                );
            case 'process':
                return <ProcessTimeline project={project} />;

            default:
                return null;
        }
    };

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
                            <span>View Project</span>
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

                            <div className="relative w-full h-full flex items-center justify-center p-4 ">
                                {renderMediaContent()}
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
                                    }}
                                    className={`flex-shrink-0 w-16 h-16 relative border-r border-black/10
                                        ${activeMedia === index ? 'bg-black/5' : 'hover:bg-black/5'}`}
                                    whileHover={{ scale: 0.95 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <img
                                        src={isVideoMedia(media) ? project.previewImg : getMediaUrl(media)}
                                        alt=""
                                        className="w-full h-full object-cover"
                                    />
                                    {(media.type === 'video' ||
                                        (typeof media === 'string' && media.endsWith('.mp4'))) && (
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
                    <div className="p-4 md:p-6">
                        {/* Project Info */}
                        <div className="space-y-2 mb-6">
                            <h1 className="text-xl font-ming text-americanred">{project.title}</h1>
                            <p className="font-ming text-sm">{project.subtitle}</p>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="flex border-b border-black/10 mb-6">
                            {['overview', 'wireframes', 'technical', 'process'].map((tab) => (
                                project[tab] || tab === 'overview' || tab === 'process' ? (
                                    <motion.button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 px-4 py-2 text-xs font-ming capitalize
                                            ${activeTab === tab ? 'text-americanred border-b-2 border-americanred' :
                                                'text-gray-600 hover:text-americanred'}`}
                                        whileHover={{ y: -2 }}
                                    >
                                        {tab}
                                    </motion.button>
                                ) : null
                            ))}
                        </div>

                        {/* Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                            >
                                {renderContent()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Full-size Image Modal */}
            <AnimatePresence>
                {fullSizeImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                        onClick={() => setFullSizeImage(null)}
                    >
                        <motion.img
                            src={fullSizeImage}
                            alt="Full size view"
                            className="max-w-full max-h-full object-contain"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        />
                        <motion.button
                            className="absolute top-4 right-4 text-white hover:text-americanred"
                            onClick={() => setFullSizeImage(null)}
                            whileHover={{ scale: 1.1 }}
                        >
                            <X className="w-6 h-6" />
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default ProjectDetails;