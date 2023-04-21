import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";

interface PublicRoutesProps {}
const PublicRoutes: React.FC<PublicRoutesProps> = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};
export default PublicRoutes;
