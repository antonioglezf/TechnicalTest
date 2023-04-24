import React from "react";
import { Link } from "react-router-dom";

const NoProjectsFound: React.FC = () => {
  return (
    <div className="flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 mt-2">
          No se han encontrado proyectos
        </h1>

        <p className="text-lg mb-8 mt-2">
          Crea un proyecto para empezar a ver el listado y las acciones
          disponibles.
        </p>

        <Link
          to="/addproject"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
        >
          Crear proyecto
        </Link>
      </div>
    </div>
  );
};

export default NoProjectsFound;
