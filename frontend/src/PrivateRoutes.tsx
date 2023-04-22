import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";
import Aplication from "./features/application/Aplication";

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Aplication />} />
      <Route
        path="/*"
        element={<Error message="Lo siento, la página que buscas no existe." />}
      />
    </Routes>
  );
}
export default PrivateRoutes;
