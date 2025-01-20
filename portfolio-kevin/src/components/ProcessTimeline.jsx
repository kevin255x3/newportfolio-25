import React, { useState } from 'react';

const ProcessTimeline = ({ project }) => {
    const [expandedStep, setExpandedStep] = useState(null);

    return (
        <div className="relative mt-16">
            {/* Vertical timeline line */}
            <div className="absolute left-0 top-0 bottom-0 border-l border-black" />

            {/* Steps */}
            <div className="space-y-16">
                {project.processSteps.map((step, index) => (
                    <div key={index} className="relative">
                        {/* Horizontal connector line */}
                        <div className="absolute left-0 top-4 w-6 border-t border-black" />

                        {/* Main container */}
                        <div className="ml-6">
                            {/* Header */}
                            <button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="text-left group flex items-start gap-4"
                            >
                                {/* Step Number */}
                                <div className="font-mono text-4xl font-bold -mt-1">
                                    {String(index + 1).padStart(2, '0')}
                                </div>

                                {/* Step Title */}
                                <div className="pt-1">
                                    <h3 className="font-mono uppercase text-sm tracking-wider flex items-center">
                                        {step.label}
                                        <span className="ml-4 opacity-50 group-hover:opacity-100">
                                            {expandedStep === index ? '––' : '++'}
                                        </span>
                                    </h3>
                                </div>
                            </button>

                            {/* Expanded Content */}
                            {expandedStep === index && (
                                <div className="mt-6 ml-14 font-mono text-sm tracking-wide">
                                    {step.description.toUpperCase()}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProcessTimeline;