import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

import WelcomeMessage from "./features/application/WelcomeMessage";
import { Navbar } from "./features/application/Navbar";
import AddProject from "./features/project/AddProject";
import { useState } from "react";
import { Project } from "./type/Project";
import ContainerList from "./features/project/ContainerList";

function PrivateRoutes() {
  const [project, setProject] = useState<Project>({
    id: 1,
    title: "",
    status: "not-started",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const handleProjectChange = (updatedProject: Project) => {
    setProject(updatedProject);
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Routes>
          <Route path="/project" element={<ContainerList />} />
          <Route
            path="/addproject"
            element={
              <AddProject project={project} onChange={handleProjectChange} />
            }
          />
          <Route path="/" element={<WelcomeMessage />} />
          <Route
            path="/*"
            element={
              <Error message="Lo siento, la página que buscas no existe." />
            }
          />
        </Routes>
      </div>
    </>
  );
}
export default PrivateRoutes;
