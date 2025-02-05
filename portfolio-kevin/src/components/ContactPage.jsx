import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";
import { motion } from "framer-motion";

// contact page component

// responsive with contanct information, subtle animations and a grid layout

// on desktop it is two columns, on mobile it is one

// suble animations to reveal content
// consistent styling and information display
// image has loading management and fallback image
function ContactPage() {
    // state managers
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    // intial delay on page load, for smoothness
    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // social media links
    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/kevin-l-280314285/" },
        { name: "YouTube", url: "https://www.youtube.com/@dinnereservations/videos" }
    ];
    // content data in array for maintenance and updates
    const skillsData = [
        {
            title: "Skills",
            content: "Marketing, Brand Identity, Web Design, UI/UX Design, Prototyping, Illustration, Graphic Design, Cinematography, Visual Communication, Project Management"
        },
        {
            title: "Softwares",
            content: `Development\nHTML, CSS, Javascript, React\n\nDesign\nFigma, Touchdesigner\n\nAdobe\nPremiere Pro, After Effects, Dimension, Photoshop, Illustrator, Indesign`
        },
        {
            title: "Work Experience",
            content: `New Balance - Sales Representative\n2024 - Present\nReigning Champ - Product Specialist\n2021 - 2024\nHolt Renfrew - Operations Associate\n2019 - 2021`
        },
        {
            title: "Contact",
            content: "hkevinlazo@gmail.com"
        },
        {
            title: "Socials",
            type: "links",
            content: socialLinks
        },
        {
            title: "Notes",
            content: "This portfolio was coded with React + Vite and styled with Tailwind CSS"
        }
    ];

    // animations/ subtle and simple
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                staggerChildren: 0.1 // chidren elementrs are staggered
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.4 }
        }
    };

    return (
        <>
            <NavBar />
            {/* main content containter  */}
            <motion.main
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 text-black text-sm leading-relaxed"
            >
                {/* two column grid layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
                    {/* left column - information */}
                    <motion.div
                        variants={containerVariants}
                        className="space-y-8 md:space-y-0"
                    >
                        {/*  grid responds to differtent screen sizes */}
                        <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-4 sm:gap-x-8 gap-y-6 sm:gap-y-12 items-start">
                            {skillsData.map((section, index) => (
                                <motion.div
                                    key={index}
                                    variants={itemVariants}
                                    className="contents"
                                >
                                    {/*  title */}
                                    <div className="text-americanred font-semibold font-ming tracking-widest text-bold transform transition-transform duration-300 hover:translate-x-2">
                                        {section.title}
                                    </div>
                                    {/* conditional content */}
                                    <div className="text-black text-sm font-helvetica leading-relaxed transition-all duration-300 hover:text-gray-800">
                                        {section.type === "links" ? (
                                            // render social links with hover effects
                                            section.content.map((link, i) => (
                                                <motion.div
                                                    key={i}
                                                    whileHover={{ x: 8 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    <a
                                                        href={link.url}
                                                        className="inline-block hover:text-americanred transition-colors duration-300"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {link.name}
                                                    </a>
                                                    <br />
                                                </motion.div>
                                            ))
                                        ) : (
                                            // render text content with line formatting
                                            <p
                                                style={{ whiteSpace: 'pre-line' }}
                                                className="transition-all duration-300 hover:text-gray-800"
                                            >
                                                {section.content}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* right column - image display */}
                    <motion.div
                        variants={containerVariants}
                        className="flex justify-center lg:justify-start"
                    >
                        {/*  image container with loading state */}
                        <div className="w-full max-w-[300px] h-[350px] relative overflow-hidden rounded-sm">
                            {/*  loading placeholder */}
                            {!isImageLoaded && (
                                <motion.div
                                    initial={{ opacity: 0.6 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
                                    className="absolute inset-0 bg-gray-200"
                                />
                            )}
                            {/* main image with loading and error handling */}
                            <motion.img
                                initial={{ scale: 1.1, opacity: 0 }}
                                animate={{
                                    scale: isImageLoaded ? 1 : 1.1,
                                    opacity: isImageLoaded ? 1 : 0
                                }}
                                transition={{ duration: 0.5 }}
                                src="./img/misc-preview.png"
                                alt="Miscellaneous Preview"
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onLoad={() => setIsImageLoaded(true)}
                                onError={(e) => {
                                    console.error('Failed to load image');
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </motion.main>
        </>
    );
}

export default ContactPage;