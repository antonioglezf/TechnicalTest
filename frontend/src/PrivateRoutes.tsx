import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

import WelcomeMessage from "./features/application/WelcomeMessage";
import { Navbar } from "./features/application/Navbar";

import { AddProject } from "./features/project/AddProject";
import List from "./features/project/List";

function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <Routes>
          <Route path="/project" element={<List />} />
          <Route path="/addproject" element={<AddProject />} />
          <Route path="/" element={<WelcomeMessage />} />
          <Route
            path="*"
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
