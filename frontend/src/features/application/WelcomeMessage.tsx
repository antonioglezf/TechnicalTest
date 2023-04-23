import React from "react";
import { Navbar } from "./Navbar";

const WelcomeMessage: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-center ">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 mt-2">
            ¡Bienvenido a la prueba técnica de Antonio González!
          </h1>
          <p className="text-lg mb-2">¡Gracias por revisar mi aplicación!</p>
          <p className="text-lg mb-8">
            Por favor, envíe sus consultas a mi dirección de correo electrónico:
          </p>
          <a
            href={`mailto:antonioglezf@gmail.com`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
          >
            antonioglezf@gmail.com
          </a>
        </div>
      </div>
    </>
  );
};

export default WelcomeMessage;
