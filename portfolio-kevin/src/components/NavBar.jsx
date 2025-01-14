import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
    return (
        <nav className="py-2">
            <div className="container mx-auto flex items-center justify-between px-8">
                {/* Logo Section */}
                <div className="flex items-center">
                    <img src="./logo.png" alt="Logo" className="w-36 h-16 object-contain" />
                </div>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-black hover:text-royal font-ming text-sm">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" className="text-black hover:text-royal font-ming text-sm">
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/projects" className="text-black hover:text-royal font-ming text-sm">
                            Projects
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" className="text-black hover:text-royal font-ming text-sm">
                            Contact
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;