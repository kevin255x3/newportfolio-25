import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ProcessTimeline = ({ project }) => {
    const [expandedStep, setExpandedStep] = useState(null);

    const contentVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            marginTop: 0
        },
        visible: {
            opacity: 1,
            height: "auto",
            marginTop: "0.5rem",
            transition: {
                duration: 0.3,
                ease: [0.76, 0, 0.24, 1]
            }
        },
        exit: {
            opacity: 0,
            height: 0,
            marginTop: 0,
            transition: {
                duration: 0.2,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    const lineVariants = {
        hidden: { scaleY: 0 },
        visible: {
            scaleY: 1,
            transition: {
                duration: 0.5,
                ease: [0.76, 0, 0.24, 1]
            }
        }
    };

    return (
        <div className="relative mt-6">
            {/* Timeline line */}
            <motion.div
                className="absolute left-3 md:left-0 top-0 bottom-0 w-px bg-black/10 origin-top"
                initial="hidden"
                animate="visible"
                variants={lineVariants}
            />

            <div className="space-y-4 md:space-y-6">
                {project.processSteps.map((step, index) => (
                    <motion.div
                        key={index}
                        className="relative group"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                        {/* Mobile-optimized connector line */}
                        <div className="absolute left-3 md:left-0 top-4 w-3 md:w-4 border-t border-black/10" />

                        <div className="ml-8 md:ml-6">
                            <motion.button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="text-left group flex items-start gap-3 md:gap-4 w-full 
                                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-americanred
                                         transition-colors duration-200 py-1 -ml-2 md:ml-0"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                                aria-expanded={expandedStep === index}
                            >
                                {/* Step number - smaller on mobile */}
                                <div className="font-ming text-xl md:text-2xl font-bold text-americanred/75 group-hover:text-americanred 
                                              transition-colors duration-200 min-w-[2rem] md:min-w-[2.5rem]">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="flex-1 pt-1">
                                    <div className="flex items-center justify-between">
                                        {/* Step title - adjusted size for mobile */}
                                        <h3 className="font-ming text-sm tracking-widest transition-colors duration-200 
                                                     group-hover:text-americanred pr-4">
                                            {step.label}
                                        </h3>

                                        {/* Icon container with touch-friendly padding */}
                                        <motion.div
                                            className="text-americanred/75 group-hover:text-americanred p-1"
                                            animate={{ rotate: expandedStep === index ? 180 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.button>

                            <AnimatePresence mode="wait">
                                {expandedStep === index && (
                                    <motion.div
                                        variants={contentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        className="overflow-hidden"
                                    >
                                        {/* description - aditional padding for mobile */}
                                        <div className="pl-8 md:pl-12 pr-4 py-3 font-helvetica text-sm leading-relaxed">
                                            {step.description}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ProcessTimeline;