import React from "react";
import { Navbar } from "./Navbar";

const WelcomeMessage: React.FC = () => {
  return (
    <>
      <div className="flex md:items-center justify-center md:h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            ¡Bienvenido a la prueba técnica de Antonio González!
          </h1>
          <p className="text-lg">
            Por favor, envíe sus consultas a mi dirección de correo electrónico:
          </p>
          <a
            href={`mailto:antonioglezf@gmail.com`}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-5 rounded"
          >
            Enviar correo electrónico
          </a>
        </div>
      </div>
    </>
  );
};

export default WelcomeMessage;
