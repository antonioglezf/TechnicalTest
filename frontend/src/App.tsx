import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { RootState } from "./store/store";
import { useSelector } from "react-redux";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

function App() {
  const isLogged = useSelector((state: RootState) => state.user.isLogged);
  return (
    <div className="wrapper">
      <Router>
        <Routes>
          {isLogged ? (
            <Route path="/*" element={<PrivateRoutes />} />
          ) : (
            <Route path="/*" element={<PublicRoutes />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
