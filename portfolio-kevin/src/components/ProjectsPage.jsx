// src/components/ProjectsPage.jsx

import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion"; // wraps animation for mounting and unmounting
import NavBar from "./NavBar";
import ProjectList from "./ProjectList";
import ProjectDetails from "./ProjectDetails";

// project page component one of the main links - built with multiple components
function ProjectsPage() {
    // state manager for tracking selected project
    const [selectedProject, setSelectedProject] = useState(null);

    // when project is selected from list
    const handleSelectProject = (project) => {
        setSelectedProject(project);
        // prevents scrolling when project modal is open
        document.body.style.overflow = 'hidden';
    };

    // handles closing the project modal
    const handleBackToSelection = () => {
        setSelectedProject(null);
        // renables scroll when modal is closed
        document.body.style.overflow = 'auto';
    };

    // component cleanup when component unmounts - this ensures scrolling is re-enabled
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            {/* nav bar */}
            <NavBar />
            {/* container that fills the viewport */}
            <div className="relative w-screen min-h-screen  overflow-hidden">
                {/* animations on enter and exit for project list component */}
                <AnimatePresence>
                    {/* only renders project list when no project is selected */}
                    {!selectedProject && (
                        <ProjectList key="selectionView" onSelectProject={handleSelectProject} />
                    )}
                </AnimatePresence>

                {/* animations on enter and exit for project details component */}
                <AnimatePresence>
                    {/* displays project details when a project is selected */}
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
