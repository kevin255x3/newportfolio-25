// src/components/ProjectsPage.jsx

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import NavBar from "./NavBar";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

function ProjectsPage() {
    const [selectedProject, setSelectedProject] = useState(null);

    const handleSelectProject = (project) => {
        setSelectedProject(project);
        // Disable body scroll when modal is open
        document.body.style.overflow = 'hidden';
    };

    const handleBackToSelection = () => {
        setSelectedProject(null);
        // Re-enable body scroll when modal is closed
        document.body.style.overflow = 'auto';
    };

    // Cleanup in case component unmounts while modal is open
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            <NavBar />
            <div className="relative w-screen min-h-screen  overflow-hidden">
                <AnimatePresence>
                    {!selectedProject && (
                        <ProjectList key="selectionView" onSelectProject={handleSelectProject} />
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {selectedProject && (
                        <ProjectDetails
                            key="detailsView"
                            project={selectedProject}
                            onBack={handleBackToSelection}
                        />
                    )}
                </AnimatePresence>
            </div>

        </>
    );
}

export default ProjectsPage;
