import React, { useState } from "react";
import myImage from "../../icon.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Link, useNavigate } from "react-router-dom";
import { loginFailure, loginSuccess } from "./userSlice";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const error = useSelector((state: RootState) => state.user.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegisterFormSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    console.log(formData);

    fetch("http://localhost:3000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("La respuesta de la red no fue correcta.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data.success", data.success);
        console.log("data.token:", data.token);

        if (data.token) {
          localStorage.setItem("token", data.token);
          dispatch(
            loginSuccess({
              token: data.token,
              email: "EMAIL",
              name: "NOMBRE",
            })
          );
          navigate("/");
        } else {
          dispatch(loginFailure(data.error || "Error desconocido"));
        }
      })
      .catch((error) => {
        dispatch(loginFailure(error.message));
      });
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={myImage}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Registrate
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleRegisterFormSubmit}>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo electrónico
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre
                </label>
              </div>
              <div className="mt-2">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Contraseña
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Registrate
              </button>
            </div>
          </form>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-5">
              {error}
            </div>
          )}
          <p className="mt-10 text-center text-sm text-gray-500 ">
            ¿Ya tienes cuenta?
            <Link
              to={{ pathname: "/" }}
              className="text-violet-600 text-base font-medium ml-font-semibold leading-6 ml-1"
            >
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
