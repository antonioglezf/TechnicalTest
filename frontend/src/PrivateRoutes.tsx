import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

import WelcomeMessage from "./features/application/WelcomeMessage";
import { Navbar } from "./features/application/Navbar";
import { useState } from "react";
import { Project } from "./type/Project";
import ContainerList from "./features/project/ContainerList";
import { AddProject } from "./features/project/AddProject";

function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Routes>
          <Route path="/project" element={<ContainerList />} />
          <Route path="/addproject" element={<AddProject />} />
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
