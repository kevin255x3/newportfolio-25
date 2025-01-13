import React from "react";
import NavBar from "./NavBar";

function ContactPage() {
    return (
        <>
            {/* Navbar */}
            <NavBar />

            {/* Main content */}
            <main
                className="
                    w-full
                    max-w-[1400px]
                    mx-auto
                    px-8
                    py-12
                    text-black
                    text-sm
                    leading-relaxed
                "
            >
                {/* Two-column layout */}
                <div className="grid grid-cols-[1fr_300px] gap-x-12">
                    {/* Left Column: Original Text Layout */}
                    <div>
                        {/* Skills */}
                        <div className="grid grid-cols-[200px_1fr] gap-x-8 gap-y-16 items-start">
                            <div className="text-americanred font-semibold font-ming tracking-widest  text-bold">
                                Skills
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed">
                                <p>
                                    Marketing, Brand Identity, Web Design, Illustration, Graphic Design,
                                    <br />Cinematography, Visual Communication, Project Management


                                </p>
                            </div>

                            {/* Software */}
                            <div className="text-americanred font-semibold font-ming tracking-widest text-bold">
                                Softwares
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed">
                                <p>
                                    Development
                                    <br />

                                    HTML, CSS, Javascript, React
                                    <br />
                                    <br />
                                    Design
                                    <br />
                                    Figma, Touchdesigner
                                    <br />
                                    <br />
                                    Adobe
                                    <br />
                                    Premiere Pro, After Effects, Dimension, Photoshop, Illustrator, Indesign,
                                </p>
                            </div>

                            {/* Work Experience */}
                            <div className="text-americanred font-semibold font-ming tracking-widest  text-bold">
                                Work Experience
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed">
                                <p>
                                    New Balance - Sales Representative
                                    <br />
                                    2024 - Present
                                    <br />
                                    Reigning Champ - Product Specialist
                                    <br />
                                    2021 - 2024
                                    <br />
                                    Holt Renfrew - Operations Associate
                                    <br />
                                    2019 - 2021
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="text-americanred font-semibold font-ming tracking-widest  text-bold">
                                Contact
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed">
                                <p>hkevinlazo@gmail.com</p>
                            </div>

                            {/* Socials */}
                            <div className="text-americanred font-semibold font-ming tracking-widest  text-bold">
                                Socials
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed">
                                <a href="#">LinkedIn</a>
                                <br />
                                <a href="#">YouTube</a>
                            </div>

                            <div className="text-americanred font-semibold font-ming tracking-widest  text-bold">
                                Notes
                            </div>
                            <div className="text-black text-sm font-helvetica leading-relaxed ">
                                <p>This portfolio was coded with React + Vite and styled with Tailwind CSS</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Video Placeholder */}
                    <div className="flex justify-start">
                        <div className="w-full max-w-[300px] h-[350px]">
                            <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                                <img src="./img/misc-preview.png" />

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ContactPage;
