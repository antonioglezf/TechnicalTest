import React from "react";
import { Link } from "react-router-dom";

interface Props {
  message?: string;
}

const Error: React.FC<Props> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">
        Error 404: Página no encontrada
      </h1>
      {message && <p className="text-lg mb-8">{message}</p>}
      <Link
        to="/"
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Volver a la página de inicio
      </Link>
    </div>
  );
};

export default Error;
