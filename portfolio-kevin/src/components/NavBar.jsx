import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for mobile menu

// navigation bar component - usually rendered at the top
function NavBar() {
    // state managemr for mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);

    return (
        // main container with a white background, z-index is high to not be hidden on any screen
        <nav className="py-2 relative bg-white z-50">
            {/* responsive container with padding */}
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* logo image container with responsive styling */}
                    <div className="flex items-center">
                        <img src="./logo.png" alt="Logo" className="w-24 h-12 md:w-36 md:h-16 object-contain" />
                    </div>

                    {/* mobile menu toggle button - visible only on mobile */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)} // toggles open state - menu visibility
                        aria-label="Toggle menu"
                    >
                        {/* conditional render statement of menu icons based on state - display appropriate icon */}
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex space-x-6">
                        {/* map list of navigation items to create links */}
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    // dynamic route for home - home = /
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-black hover:text-royal font-ming text-sm" // hover styles and font styles
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* mobile nav conditonal render statement - based on is open state */}
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="pt-2 pb-4 space-y-2">
                        {/* same logic as desktop navigation but styled for mobile */}
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="block px-2 py-2 text-black hover:text-royal font-ming text-sm"
                                    onClick={() => setIsOpen(false)} // closes menu when link is clicked
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;