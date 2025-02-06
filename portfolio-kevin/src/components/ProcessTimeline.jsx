import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // animation library
import { ChevronDown, ChevronUp } from 'lucide-react'; // icons for expanding/collapsing content

// process timeline component, rendered on project details page
const ProcessTimeline = ({ project }) => {
    // state manager for tracking which step is expanded - if none then state is set to null
    const [expandedStep, setExpandedStep] = useState(null);

    // subtle animations when content is expanded
    const contentVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            marginTop: 0
        },
        visible: {
            opacity: 1,
            height: "auto",
            marginTop: "1.5rem",
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    // vertical timeline animation configuration
    const lineVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        // timeline container, top margin is responsive
        <div className="relative mt-8 sm:mt-16">
            {/* vertical timeline in the timeline, with animations */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-black origin-top"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
            />

            {/* timeline steps container */}
            <div className="space-y-8 sm:space-y-16">
                {/* maps through the process steps array. from the projectsData.js */}
                {project.processSteps.map((step, index) => (
                    <div key={index} className="relative group">
                        {/* connector line */}
                        <div className="absolute left-0 top-4 w-4 sm:w-6 border-t border-black" />

                        {/* step parents container */}
                        <div className="ml-4 sm:ml-6">
                            {/* collapsable / expandable header */}
                            <button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="text-left group flex items-start gap-2 sm:gap-4 w-full 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                                         rounded-sm transition-colors duration-200"
                                aria-expanded={expandedStep === index}
                            >
                                {/* step number with hover animation */}
                                <div className="font-mono text-2xl sm:text-4xl font-bold -mt-1 transition-colors duration-200
                                              group-hover:text-americanred">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* title and toggle icon container */}
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center justify-between">
                                        {/* step title */}
                                        <h3 className="font-mono uppercase text-xs sm:text-sm tracking-wider 
                                                     transition-colors duration-200 group-hover:text-americanred">
                                            {step.label}
                                        </h3>
                                        {/* toggle icon with opacity animation */}
                                        <div className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity duration-200">
                                            {expandedStep === index ? (
                                                <ChevronUp className="w-4 h-4" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </button>

                            {/* exapandable content section */}
                            <AnimatePresence mode="wait">
                                {expandedStep === index && (
                                    <motion.div
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="overflow-hidden"
                                    >
                                        {/* description */}
                                        <div className="ml-0 sm:ml-14 font-mono text-xs sm:text-sm tracking-wide
                                                      bg-gray-50 p-4 rounded-md">
                                            {step.description.toUpperCase()}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessTimeline;