import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

function AboutPage() {
    const [isVideoLoaded, setIsVideoLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <NavBar className="fixed top-0 left-0 w-full" />
            <div className="bg-white h-screen overflow-y-auto">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className={`py-12 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                        <div className="w-[500px]">
                            <div className="w-full max-w-md mx-auto">
                                <div className="relative">
                                    {!isVideoLoaded && (
                                        <div className="w-full aspect-video bg-gray-200 animate-pulse absolute top-0 left-0" />
                                    )}
                                    <video
                                        src="/subway.mp4"
                                        className={`w-full object-cover transition-opacity duration-300 ${isVideoLoaded ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        preload="auto"
                                        onLoadedData={() => setIsVideoLoaded(true)}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-gray-700 text-sm font-ming">
                                    <div className="space-y-4">
                                        <p>Kevin is a 23 year old designer based in Vancouver. He was born in the Philippines in 2001. He studies New Media Design and Web Development at the British Columbia Institute of Technology.</p>
                                        <p>Kevin's design approach is multidisciplinary, his work ranges from graphic design, web design, product design to motion fx, cinematography and brand marketing.</p>
                                        <p>Kevin is curious and experimental. He is able to explore his interests and discover new techniques, methods and philosophies by engaging in design work.</p>
                                        <p>Kevin's goal is to learn consistently, then apply his learning to creating projects for clients. In the meantime, he is taking it one day at a time and enjoying the process.</p>
                                        <p>Kevin's consistently engages in fashion, music, and sports in his free time. Drawing influence from his passions to inspire his design work.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AboutPage;