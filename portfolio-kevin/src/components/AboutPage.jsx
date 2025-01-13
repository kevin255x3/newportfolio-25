import React from "react";
import NavBar from "./NavBar";

function AboutPage() {
    return (
        <>
            <NavBar className="fixed top-0 left-0 w-full" />

            <div className="bg-white h-screen overflow-y-auto">
                <div className="min-h-screen flex items-center justify-center px-4">
                    <div className="py-12">
                        {/* Release 1 */}
                        <div className="w-[500px]">
                            <div className="w-full max-w-md mx-auto">
                                <video
                                    src="/subway.mp4"
                                    alt="Release 1"
                                    className="w-full object-cover"
                                    autoPlay
                                    loop
                                    muted
                                />
                                <div className="flex justify-between mt-2 text-gray-700 text-sm font-ming">
                                    <div>
                                        <span className="font-semibold text-americanblue ">  </span>
                                        <br />
                                        <br />
                                        Kevin is a 23 year old designer based in Vancouver. He was born in the Philippines in 2001. He studies New Media Design and Web Development at the British Columbia Instutiute of Technology.
                                        <br />
                                        <br />
                                        Kevin’s design approach is multidisciplinary, his work ranges from graphic design, web design, product design to motion fx, cinematography and brand marketing.
                                        <br />
                                        <br />
                                        Kevin is curious and experimental. He is able to explore his interests and discover new techniques, methods and philosophies by engaging in design work.
                                        <br />
                                        <br />
                                        Kevin’s goal is to learn consistently, then apply his learning to creating projects for clients. In the meantime, he is taking it one day at a time and enjoying the process.
                                        <br />
                                        <br />
                                        Kevin’s consistently engages in fashion, music, and sports in his free time. Drawing influence from his passions to inspire his design work.



                                    </div>
                                    <div className="font-ming text-americanred"></div>


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