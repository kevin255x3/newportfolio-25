import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Link2, FileText, Image, Code, MessagesSquare } from 'lucide-react';

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

    const renderStepContent = (step) => (
        <div className="space-y-4">
            {/* Main Description */}
            <p className="font-helvetica text-sm leading-relaxed">
                {step.description}
            </p>

            {/* Challenges Section */}
            {step.challenges && (
                <div className="space-y-2">
                    <h4 className="font-ming text-xs text-americanred">Challenges Faced</h4>
                    <ul className="list-none space-y-2">
                        {step.challenges.map((challenge, idx) => (
                            <li key={idx} className="font-helvetica text-sm flex items-start gap-2">
                                <span className="text-americanred/75">•</span>
                                {challenge}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Solutions/Decisions Section */}
            {step.solutions && (
                <div className="space-y-2">
                    <h4 className="font-ming text-xs text-americanred">Solutions & Decisions</h4>
                    <ul className="list-none space-y-2">
                        {step.solutions.map((solution, idx) => (
                            <li key={idx} className="font-helvetica text-sm flex items-start gap-2">
                                <span className="text-americanred/75">•</span>
                                {solution}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Resources Section */}
            {step.resources && (
                <div className="space-y-2">
                    <h4 className="font-ming text-xs text-americanred">Key Resources</h4>
                    <div className="flex flex-wrap gap-3">
                        {step.resources.map((resource, idx) => (
                            <motion.a
                                key={idx}
                                href={resource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 px-3 py-1 rounded-full 
                                         border border-black/10 text-xs font-helvetica
                                         hover:border-americanred hover:text-americanred
                                         transition-colors duration-200"
                                whileHover={{ x: 3 }}
                            >
                                {getResourceIcon(resource.type)}
                                {resource.label}
                            </motion.a>
                        ))}
                    </div>
                </div>
            )}

            {/* Outcomes Section */}
            {step.outcomes && (
                <div className="space-y-2">
                    <h4 className="font-ming text-xs text-americanred">Key Outcomes</h4>
                    <ul className="list-none space-y-2">
                        {step.outcomes.map((outcome, idx) => (
                            <li key={idx} className="font-helvetica text-sm flex items-start gap-2">
                                <span className="text-americanred/75">•</span>
                                {outcome}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    const getResourceIcon = (type) => {
        switch (type) {
            case 'documentation': return <FileText className="w-3 h-3" />;
            case 'inspiration': return <Image className="w-3 h-3" />;
            case 'code': return <Code className="w-3 h-3" />;
            case 'discussion': return <MessagesSquare className="w-3 h-3" />;
            default: return <Link2 className="w-3 h-3" />;
        }
    };

    return (
        <div className="relative mt-6">
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
                        <div className="absolute left-3 md:left-0 top-4 w-3 md:w-4 border-t border-black/10" />

                        <div className="ml-8 md:ml-6">
                            <motion.button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="text-left group flex items-start gap-3 md:gap-4 w-full 
                                         focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 
                                         focus-visible:ring-americanred transition-colors duration-200 
                                         py-1 -ml-2 md:ml-0"
                                whileHover={{ x: 5 }}
                                transition={{ duration: 0.2 }}
                                aria-expanded={expandedStep === index}
                            >
                                <div className="font-ming text-xl md:text-2xl font-bold text-americanred/75 
                                              group-hover:text-americanred transition-colors duration-200 
                                              min-w-[2rem] md:min-w-[2.5rem]">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                <div className="flex-1 pt-1">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-ming text-sm tracking-widest transition-colors 
                                                     duration-200 group-hover:text-americanred pr-4">
                                            {step.label}
                                        </h3>

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
                                        <div className="pl-8 md:pl-12 pr-4 py-3">
                                            {renderStepContent(step)}
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