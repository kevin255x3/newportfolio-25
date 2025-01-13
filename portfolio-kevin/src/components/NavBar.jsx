import React from "react";

function NavBar() {
    return (
        <nav className="  py-2">
            <div className="container mx-auto flex items-center justify-between px-8">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src="./logo.png" alt="Logo" className="w-36 h-16 object-contain" />
                    {/* <p className="text-black font-artbold font-bold text-lg tracking-wide">KEVIN LAZO ++</p> */}
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <a href="/" className="text-black hover:text-royal font-ming  text-sm">Home</a>
                    </li>
                    <li>
                        <a href="/about" className="text-black hover:text-royal font-ming  text-sm">About</a>
                    </li>
                    <li>
                        <a href="/projects" className="text-black hover:text-royal font-ming  text-sm">Projects</a>
                    </li>
                    <li>
                        <a href="/contact" className="text-black hover:text-royal font-ming  text-sm">Contact</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
