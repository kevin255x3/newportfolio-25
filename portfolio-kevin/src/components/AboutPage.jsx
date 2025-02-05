import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import { motion, useAnimation } from "framer-motion";

function AboutPage() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const controls = useAnimation();

    useEffect(() => {
        // Check if device supports touch
        setIsTouchDevice('ontouchstart' in window);
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

    // Debounced scroll handler
    const handleScroll = useCallback(() => {
        if (isScrolling) return;
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 50);

        const sections = document.querySelectorAll('.snap-section');
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            if (rect.top >= -windowHeight / 2 && rect.top <= windowHeight / 2) {
                setCurrentSection(index);
            }
        });
    }, [isScrolling]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToSection = useCallback((index) => {
        const section = document.getElementById(`section-${index}`);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
                scrollToSection(currentSection + 1);
            } else if (e.key === 'ArrowUp' && currentSection > 0) {
                scrollToSection(currentSection - 1);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSection, sections.length, scrollToSection]);

    return (
        <>
            <NavBar className="fixed top-0 left-0 w-full z-50" />

            {/* Section Indicators - Hidden on mobile */}
            <motion.div
                className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-3 z-50 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {sections.map((_, index) => (
                    <motion.button
                        key={index}
                        className="group relative flex items-center"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => scrollToSection(index)}
                    >
                        <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSection === index ? 'bg-americanred w-3 h-3' : 'bg-gray-300'
                                }`}
                        />
                        <span className="absolute left-full ml-2 text-sm font-ming opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {sections[index].title}
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            <div
                className="bg-white overflow-y-auto snap-y snap-mandatory h-screen"
                style={{ scrollBehavior: 'smooth' }}
            >
                {sections.map((section, index) => (
                    <motion.section
                        id={`section-${index}`}
                        key={index}
                        className="snap-section min-h-screen flex items-center justify-center px-4 snap-start relative"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: "-20%" }}
                        onViewportEnter={() => setCurrentSection(index)}
                    >
                        <div className={`w-full py-12 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                            <div className="w-full max-w-2xl mx-auto px-4">
                                <motion.div
                                    className="relative rounded-lg overflow-hidden"
                                    whileInView={{ scale: [0.95, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {section.isVideo ? (
                                        <>
                                            {!isVideoLoaded && (
                                                <motion.div
                                                    className="w-full aspect-video bg-gray-200"
                                                    animate={{ opacity: [0.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                                />
                                            )}
                                            <video
                                                src={section.media}
                                                className={`w-full object-cover transition-all duration-500 ${isVideoLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                                                    }`}
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
                                </motion.div>
                                <motion.div
                                    className="mt-8 space-y-4"
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                >
                                    <h1 className="text-americanred text-2xl font-bold mb-6 font-ming">
                                        {section.title}
                                    </h1>
                                    {section.content.map((text, i) => (
                                        <motion.p
                                            key={i}
                                            className="text-sm text-gray-700 font-ming"
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 + (i * 0.1) }}
                                        >
                                            {text}
                                        </motion.p>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </motion.section>
                ))}
            </div>

            {/* Scroll Indicator - Only shown on first load and hidden on touch devices */}
            <motion.div
                className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-ming ${isTouchDevice ? 'hidden' : ''
                    }`}
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    y: [0, 10, 0]
                }}
                transition={{
                    duration: 2,
                    repeat: 3,
                    repeatType: "reverse"
                }}
            >
                {isTouchDevice ? 'Swipe Up' : 'Scroll Down ↓'}
            </motion.div>
        </>
    );
}

export default AboutPage;