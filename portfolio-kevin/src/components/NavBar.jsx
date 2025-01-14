import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

// NavBar Component
function NavBar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="py-2 relative bg-white z-50">
            <div className="container mx-auto px-4 lg:px-8">
                <div className="flex items-center justify-between">
                    {/* Logo Section */}
                    <div className="flex items-center">
                        <img src="./logo.png" alt="Logo" className="w-24 h-12 md:w-36 md:h-16 object-contain" />
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Desktop Navigation */}
                    <ul className="hidden lg:flex space-x-6">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="text-black hover:text-royal font-ming text-sm"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
                    <ul className="pt-2 pb-4 space-y-2">
                        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                            <li key={item}>
                                <Link
                                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    className="block px-2 py-2 text-black hover:text-royal font-ming text-sm"
                                    onClick={() => setIsOpen(false)}
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