import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ProcessTimeline = ({ project }) => {
    const [expandedStep, setExpandedStep] = useState(null);

    // Animation variants for the content
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

    // Animation variants for the line connector
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
        <div className="relative mt-8 sm:mt-16">
            {/* Vertical timeline line with animation */}
            <motion.div
                className="absolute left-0 top-0 bottom-0 w-px bg-black origin-top"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
            />

            {/* Steps */}
            <div className="space-y-8 sm:space-y-16">
                {project.processSteps.map((step, index) => (
                    <div key={index} className="relative group">
                        {/* Horizontal connector line */}
                        <div className="absolute left-0 top-4 w-4 sm:w-6 border-t border-black" />

                        {/* Main container */}
                        <div className="ml-4 sm:ml-6">
                            {/* Header Button */}
                            <button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="text-left group flex items-start gap-2 sm:gap-4 w-full 
                                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black
                                         rounded-sm transition-colors duration-200"
                                aria-expanded={expandedStep === index}
                            >
                                {/* Step Number */}
                                <div className="font-mono text-2xl sm:text-4xl font-bold -mt-1 transition-colors duration-200
                                              group-hover:text-americanred">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Step Title and Toggle Icon */}
                                <div className="flex-1 pt-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-mono uppercase text-xs sm:text-sm tracking-wider 
                                                     transition-colors duration-200 group-hover:text-americanred">
                                            {step.label}
                                        </h3>
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

                            {/* Expanded Content with AnimatePresence */}
                            <AnimatePresence mode="wait">
                                {expandedStep === index && (
                                    <motion.div
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="overflow-hidden"
                                    >
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