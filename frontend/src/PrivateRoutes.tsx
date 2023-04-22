import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Aplication from "./features/application/Aplication";
import WelcomeMessage from "./features/application/WelcomeMessage";
import { Navbar } from "./features/application/Navbar";

function PrivateRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/project" element={<Aplication />} />
        <Route path="/addproject" element={<Aplication />} />
        <Route path="/" element={<WelcomeMessage />} />
        <Route
          path="/*"
          element={
            <Error message="Lo siento, la página que buscas no existe." />
          }
        />
      </Routes>
    </>
  );
}
export default PrivateRoutes;
