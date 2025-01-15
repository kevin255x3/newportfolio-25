import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

function AboutPage() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const sections = [
        {
            title: "About me",
            media: "/about.mp4",
            isVideo: true,
            content: [
                "Hi, I'm Kevin - a multidisciplinary designer exploring the intersection of digital media and creative expression.",
                "Based in Vancouver, born in the Philippines, and currently shaping my creative journey at BCIT's New Media Design and Web Development program",
                "My creative toolkit spans graphic design, web development, product design, motion effects, cinematography, and brand marketing",
                "I approach each project with curiosity and openness to experimentation, allowing me to discover innovative solutions and fresh perspectives"
            ]
        },
        {
            title: "Design Philosophy",
            media: "/philo.mp4",
            isVideo: true,
            content: [
                "I believe in learning through doing - each project is an opportunity to explore new techniques and expand my creative boundaries",
                "My goal is to blend continuous learning with practical application, creating meaningful work that serves real client needs",
                "I value the process as much as the outcome, taking thoughtful steps toward growth while maintaining enthusiasm for each new challenge"
            ]
        },
        {
            title: "Beyond Design",
            media: "/beyond.mp4",
            isVideo: true,
            content: [
                "My creativity is fueled by my passions in fashion, music, and sports, which naturally influence and enrich my design work",
                "These diverse interests help me bring fresh perspectives and cultural awareness to my projects",
                "Currently accepting new projects and eager to collaborate on innovative design solutions. Feel free to reach out to discuss potential opportunities."
            ]
        }
    ];

    return (
        <>
            <NavBar className="fixed top-0 left-0 w-full z-50" />

            {/* Scroll Indicator */}
            <div className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-2 z-50">
                {sections.map((_, index) => (
                    <div
                        key={index}
                        className={`w-2 h-2 cursor-pointer ${currentSection === index ? 'bg-americanred' : 'bg-gray-300'}`}
                        onClick={() => document.getElementById(`section-${index}`).scrollIntoView({ behavior: 'smooth' })}
                    />
                ))}
            </div>

            <div className="bg-white overflow-y-auto snap-y snap-mandatory h-screen">
                {sections.map((section, index) => (
                    <motion.div
                        id={`section-${index}`}
                        key={index}
                        className="min-h-screen flex items-center justify-center px-4 snap-start"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        onViewportEnter={() => setCurrentSection(index)}
                    >
                        <div className={`w-full py-12 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                            <div className="w-full max-w-2xl mx-auto px-4">
                                <div className="relative">
                                    {section.isVideo ? (
                                        <>
                                            {!isVideoLoaded && (
                                                <div className="w-full aspect-video bg-gray-200 animate-pulse absolute top-0 left-0" />
                                            )}
                                            <video
                                                src={section.media}
                                                className={`w-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                preload="auto"
                                                onLoadedData={() => setIsVideoLoaded(true)}
                                            />
                                        </>
                                    ) : (
                                        <img
                                            src={section.media}
                                            alt={section.title}
                                            className="w-full object-cover"
                                        />
                                    )}
                                </div>
                                <motion.div
                                    className="mt-8 text-gray-700 font-ming space-y-4"
                                    initial={{ y: 20 }}
                                    whileInView={{ y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h1 className="text-americanred text-2xl font-bold mb-6">
                                        {section.title}
                                    </h1>
                                    {section.content.map((text, i) => (
                                        <p key={i} className="text-sm">
                                            {text}
                                        </p>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-ming"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                Scroll Down ↓
            </motion.div>
        </>
    );
}

export default AboutPage;