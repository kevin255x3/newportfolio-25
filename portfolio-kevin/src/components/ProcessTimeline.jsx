import React, { useState } from 'react';
import {
    Clock,
    ChevronDown,
    ChevronRight,
    ArrowRight,
    FileText,
    Code,
    Link as LinkIcon
} from 'lucide-react';

// Progress wheel component for step completion
const ProgressWheel = ({ percentage }) => {
    const radius = 30;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="relative w-16 h-16">
            <svg className="transform -rotate-90 w-16 h-16">
                <circle
                    className="text-white"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
                <circle
                    className="text-green-200 transition-all duration-500"
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx="32"
                    cy="32"
                />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                {Math.round(percentage)}%
            </span>
        </div>
    );
};

const ProcessTimeline = ({ project }) => {
    const [expandedStep, setExpandedStep] = useState(null);
    const [isHovered, setIsHovered] = useState(null);

    // Calculate the percentage for each step
    const totalSteps = project.processSteps.length;
    const stepPercentage = 100 / totalSteps;

    return (
        <div className="space-y-6">
            {/* Project Overview */}
            <div className="bg-gray-50 p-6 ">
                <h2 className="text-xl font-ming mb-2">{project.title}</h2>
                <p className="text-gray-600 font-ming mb-4">{project.subtitle}</p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span className="text-gray-500 font-ming flex items-center gap-2">
                            <Code className="w-4 h-4" />
                            Software Used:
                        </span>
                        <span className="font-helvetica">{project.software}</span>
                    </div>
                    {project.link && (
                        <div>
                            <span className="text-gray-500 font-ming flex items-center gap-2">
                                <LinkIcon className="w-4 h-4 " />
                                Project Link:
                            </span>
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline font-helvetica"
                            >
                                View Project
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Process Timeline */}
            <div className="relative">
                {/* Vertical connecting line */}
                <div
                    className="absolute left-12 top-0 bottom-0 w-0.5 bg-gray-200"
                    style={{ transform: 'translateX(-50%)' }}
                />

                {/* Steps */}
                <div className="space-y-6">
                    {project.processSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`
                relative transition-all duration-300
                ${expandedStep === index ? 'bg-white' : 'bg-white'}
                 border border-gray-200 hover:border-gray-300
                ${isHovered === index ? 'shadow-lg' : 'shadow-sm'}
              `}
                            onMouseEnter={() => setIsHovered(index)}
                            onMouseLeave={() => setIsHovered(null)}
                        >
                            {/* Timeline dot */}
                            <div
                                className={`
                  absolute left-12 top-8 w-4 h-4 rounded-full
                  ${index <= (expandedStep ?? -1) ? 'bg-blue-600' : 'bg-gray-300'}
                  transform -translate-x-1/2
                  transition-all duration-300
                `}
                            />

                            {/* Step Header */}
                            <button
                                onClick={() => setExpandedStep(expandedStep === index ? null : index)}
                                className="w-full text-left p-6 flex items-center gap-4"
                            >
                                <div className={`
                  flex-shrink-0 w-12 h-12
                  ${expandedStep === index ? 'bg-americanred' : 'bg-gray-600'}
                  ${isHovered === index ? 'scale-110' : 'scale-100'}
                  transition-all duration-300
                  flex items-center justify-center text-white font-ming rounded-full
                `}>
                                    {index + 1}
                                </div>

                                <div className="flex-grow">
                                    <h3 className="text-lg font-ming flex items-center gap-2">
                                        {step.label}
                                        {expandedStep === index ?
                                            <ChevronDown className="w-5 h-5" /> :
                                            <ChevronRight className="w-5 h-5" />
                                        }
                                    </h3>
                                    <div className="text-sm font-ming text-gray-500 mt-1">
                                        Phase {index + 1} of {totalSteps}
                                    </div>
                                </div>

                                <ProgressWheel percentage={(index + 1) * stepPercentage} />
                            </button>

                            {/* Expanded Content */}
                            {expandedStep === index && (
                                <div className="px-6 pb-6">
                                    <div className="ml-16">
                                        {/* Description */}
                                        <div className="bg-white rounded- p-4 border ">
                                            <div className="flex items-start gap-3">

                                                <p className="text-sm font-helvetica leading-relaxed">
                                                    {step.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Next Step Preview */}
                                        {index < project.processSteps.length - 1 && (
                                            <div className="mt-4 pt-4 border-t border-gray-100">
                                                <p className="text-sm font-ming text-gray-500 flex items-center gap-2">
                                                    <ArrowRight className="w-4 h-4" />
                                                    Next: {project.processSteps[index + 1].label}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProcessTimeline;