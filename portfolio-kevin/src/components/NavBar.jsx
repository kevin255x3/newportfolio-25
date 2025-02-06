import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // icons for mobile menu
import { motion, AnimatePresence } from "framer-motion";

// navigation bar component - usually rendered at the top
function NavBar() {
    // state manager for mobile menu visibility
    const [isOpen, setIsOpen] = useState(false);

    // Refined animation variants for a more subtle effect
    const menuVariants = {
        open: {
            height: "auto",
            opacity: 1,
            transition: {
                height: { duration: 0.3, ease: "easeOut" },
                opacity: { duration: 0.2, ease: "easeOut" },
                staggerChildren: 0.05,
                delayChildren: 0.1
            }
        },
        closed: {
            height: 0,
            opacity: 0,
            transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.2, ease: "easeInOut" },
                staggerChildren: 0.03,
                staggerDirection: -1
            }
        }
    };

    const itemVariants = {
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        closed: {
            opacity: 0,
            y: 10,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

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
                        <motion.span
                            animate={isOpen ? "open" : "closed"}
                            variants={{
                                open: { opacity: 1 },
                                closed: { opacity: 1 }
                            }}
                            transition={{ duration: 0.2 }}
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </motion.span>
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

                {/* mobile nav conditional render statement - based on is open state */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial="closed"
                            animate="open"
                            exit="closed"
                            variants={menuVariants}
                            className="lg:hidden overflow-hidden"
                        >
                            <motion.ul
                                className="pt-2 pb-4 space-y-2"
                            >
                                {/* same logic as desktop navigation but styled for mobile */}
                                {['Home', 'About', 'Projects', 'Contact'].map((item) => (
                                    <motion.li
                                        key={item}
                                        variants={itemVariants}
                                        className="transform"
                                        whileHover={{ x: 2 }}
                                        whileTap={{ x: 0 }}
                                    >
                                        <Link
                                            to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                            className="block px-2 py-2 text-black hover:text-royal font-ming text-sm"
                                            onClick={() => setIsOpen(false)} // closes menu when link is clicked
                                        >
                                            {item}
                                        </Link>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}

export default NavBar;