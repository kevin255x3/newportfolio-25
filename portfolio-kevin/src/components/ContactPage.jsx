import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

function ContactPage() {
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Fade in content on mount
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    // Social links with proper security attributes
    const socialLinks = [
        { name: "LinkedIn", url: "https://www.linkedin.com/in/kevin-l-280314285/" },
        { name: "YouTube", url: "https://www.youtube.com/@dinnereservations/videos" }
    ];

    // Skills data structure
    const skillsData = [
        {
            title: "Skills",
            content: "Marketing, Brand Identity, Web Design, Illustration, Graphic Design, Cinematography, Visual Communication, Project Management"
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

    return (
        <>
            <NavBar />
            <main className={`
                w-full
                max-w-[1400px]
                mx-auto
                px-8
                py-12
                text-black
                text-sm
                leading-relaxed
                transition-opacity
                duration-500
                ${isVisible ? 'opacity-100' : 'opacity-0'}
            `}>
                <div className="grid grid-cols-[1fr_300px] gap-x-12">
                    {/* Left Column */}
                    <div>
                        <div className="grid grid-cols-[200px_1fr] gap-x-8 gap-y-16 items-start">
                            {skillsData.map((section, index) => (
                                <React.Fragment key={index}>
                                    <div className="text-americanred font-semibold font-ming tracking-widest text-bold">
                                        {section.title}
                                    </div>
                                    <div className="text-black text-sm font-helvetica leading-relaxed">
                                        {section.type === "links" ? (
                                            section.content.map((link, i) => (
                                                <React.Fragment key={i}>
                                                    <a
                                                        href={link.url}
                                                        className="hover:text-americanred transition-colors duration-200"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {link.name}
                                                    </a>
                                                    <br />
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <p style={{ whiteSpace: 'pre-line' }}>
                                                {section.content}
                                            </p>
                                        )}
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="flex justify-start">
                        <div className="w-full max-w-[300px] h-[350px] relative">
                            {!isImageLoaded && (
                                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
                            )}
                            <img
                                src="./img/misc-preview.png"
                                alt="Miscellaneous Preview"
                                className={`w-full h-full object-cover transition-opacity duration-300 ${isImageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                loading="lazy"
                                onLoad={() => setIsImageLoaded(true)}
                                onError={(e) => {
                                    console.error('Failed to load image');
                                    e.target.src = '/fallback-image.jpg';
                                }}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ContactPage;