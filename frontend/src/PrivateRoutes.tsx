import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Error from "./pages/Error";

function PrivateRoutes() {
  return (
    <Routes>
      <Route
        path="/*"
        element={<Error message="Lo siento, la página que buscas no existe." />}
      />
    </Routes>
  );
}
export default PrivateRoutes;
