import React, { useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar";
import { motion, useAnimation } from "framer-motion";

// about page component
// snap scrolling page with different sections, ensure usability taking into consideration different devices, technology, hardware, and software.

// each video has a loading state to prevent lag
// can navigate with keyboard and arrow keys
// adapts to touch devices
function AboutPage() {

    // state managers
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);
    const controls = useAnimation();

    // intialization
    useEffect(() => {
        // checks if device supports touch / device capabilities
        setIsTouchDevice('ontouchstart' in window);
        // delayed loading for smoothness
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // organized content for easy maintenance and updates, content array.
    const sections = [
        {
            title: "About me",
            media: "/img/aboutpic.jpg",
            isVideo: false,
            content: [
                "Hey, I'm Kevin - I create digital things that connect with people and their stories.",
                "Vancouver's my home now, though I grew up in the Philippines. I'm currently exploring design and development at BCIT's New Media program.",
                "Over time, I've found myself drawn to all kinds of creative work - from graphic design and web development to motion effects and cinematography. Each one gives me a different way to bring ideas to life.",
                "Curiosity keeps me going. I enjoy creating things that work in unexpected ways and might make someone's day a little better."
            ]
        },
        {
            title: "Design Philosophy",
            media: "/designphilosphyo.mp4",
            isVideo: true,
            content: [
                "I learn best by doing - making something teaches me more than just thinking about it. Each new project is a chance to explore and grow.",
                "For me, good design comes from combining what I'm learning with simple, clear ideas. I enjoy creating work that actually helps people in their day-to-day.",
                "I find as much joy in the process as in the finished piece. When you enjoy each step, the creativity just flows more naturally."
            ]
        },
        {
            title: "Beyond Design",
            media: "/bdes.jpeg",
            isVideo: false,
            content: [
                "The things I love outside of work - fashion, music, basketball - they all find their way into my design thinking somehow.",
                "Having different interests helps me see connections others might miss. It's like having more colors to paint with or more notes to play.",
                "I'm drawn to people with passion for what they do. I bring that same energy to my own work - whether it's a personal project, creative exploration, or client solution."
            ]
        }
    ];

    // scroll handler using debounce
    // stops excessive updates when rapidly scrolling
    const handleScroll = useCallback(() => {
        if (isScrolling) return;
        setIsScrolling(true);
        setTimeout(() => setIsScrolling(false), 50);

        // calculate current section based on the position in the viewport
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

    // scroll event listener
    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // navigation with smooth scrolling
    const scrollToSection = useCallback((index) => {
        const section = document.getElementById(`section-${index}`);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, []);

    // keyboard navigation.
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
            {/* navigation bar - fixed */}
            <NavBar className="fixed top-0 left-0 w-full z-50" />

            {/* section indicators - not visible on mobile */}
            <motion.div
                className="fixed right-4 top-1/2 transform -translate-y-1/2 space-y-3 z-50 hidden md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                {/* indicates active section */}
                {sections.map((_, index) => (
                    <motion.button
                        key={index}
                        className="group relative flex items-center"
                        whileHover={{ scale: 1.2 }}
                        onClick={() => scrollToSection(index)}
                    >
                        <div
                            className={`w-2 h-2  transition-all duration-300 ${currentSection === index ? 'bg-americanred w-3 h-3' : 'bg-gray-300'
                                }`}
                        />
                        {/* section title when hovered */}
                        <span className="absolute left-full ml-2 text-sm font-ming opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                            {sections[index].title}
                        </span>
                    </motion.button>
                ))}
            </motion.div>

            {/* main content - scrollable with snap */}
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
                        {/* section content */}
                        <div className={`w-full py-12 ${isVisible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}>
                            <div className="w-full max-w-2xl mx-auto px-4">
                                {/*  video container */}
                                <motion.div
                                    className="relative  overflow-hidden"
                                    whileInView={{ scale: [0.95, 1] }}
                                    transition={{ duration: 0.5 }}
                                >
                                    {section.isVideo ? (
                                        <>
                                            {/* video loading placeholder */}
                                            {!isVideoLoaded && (
                                                <motion.div
                                                    className="w-full aspect-video bg-gray-200"
                                                    animate={{ opacity: [0.5, 1] }}
                                                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                                                />
                                            )}
                                            {/* video */}
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
                                {/*  text blocks */}
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

            {/* scroll indicator - on the side, loads on intialization, not availble on touch devices */}
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