import React from "react";
import myImage from "../../icon.svg";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
export const Navbar: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.name);
  return (
    <nav className="bg-slate-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <img
            className="flex-shrink-0 flex items-center mx-auto h-10 w-auto"
            src={myImage}
            alt="TechnicalTest"
          />
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-white  hover:text-gray-500"
              >
                Home
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-500 "
              >
                Friends
              </a>
              <a
                href="#"
                className="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-500"
              >
                Messages
              </a>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center">
            <div className="flex items-center">
              <span className="text-gray-300 text-sm pr-10">
                Hola, ${name}!
              </span>
              <button
                onClick={() => /*handleLogout()*/ console.log("first")}
                className="bg-red-800 hover:bg-red-400 px-3 py-2 rounded-md text-sm font-medium text-white focus:outline-none focus:shadow-outline"
              >
                Desconectar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
