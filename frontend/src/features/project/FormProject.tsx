import { useState } from "react";
import { Project } from "../../type/Project";
interface ProjectFormInputProps {
  project: Project;
  onSave: (project: Project) => void;
  onCancel: () => void;
}

function format(date: Date) {
  if (!(date instanceof Date)) {
    throw new Error('Invalid "date" argument. You must pass a date instance');
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

const FormProject: React.FC<ProjectFormInputProps> = ({
  project,
  onSave,
  onCancel,
}) => {
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [status, setStatus] = useState(project.status);
  const [startDate, setStartDate] = useState(project.startDate || "");
  const [endDate, setEndDate] = useState(project.endDate || "");

  const handleSave = () => {
    const updatedProject: Project = {
      ...project,
      title,
      description,
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    };
    onSave(updatedProject);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value);
  };
  const handleCancel = () => {
    resetForm();
    onCancel();
  };

  const resetForm = () => {
    setTitle(project.title);
    setDescription(project.description || "");
    setStatus(project.status);
    setStartDate(project.startDate || "");
    setEndDate(project.endDate || "");
  };
  return (
    <form onSubmit={handleSave}>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
          Nombre del proyecto
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          type="text"
          placeholder="Introduzca el título del proyecto"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 font-bold mb-2"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Introduzca la descripción del proyecto"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="status">
          Estado
        </label>
        <select
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="not-started">No iniciado</option>
          <option value="in-progress">En progreso</option>
          <option value="completed">Completado</option>
        </select>
      </div>
      <div className="flex flex-row">
        <div className="mb-4 mr-2 flex-1">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="startDate"
          >
            Fecha de inicio
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="startDate"
            type="date"
            value={format(new Date(startDate))}
            onChange={(event) => setStartDate(event.target.value)}
          />
        </div>
        <div className="mb-4 ml-2 flex-1">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="endDate"
          >
            Fecha de finalización
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="endDate"
            type="date"
            value={endDate ? format(new Date(endDate)) : ""}
            onChange={(event) => setEndDate(event.target.value)}
          />
        </div>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
        type="button"
        onClick={handleSave}
      >
        Guardar
      </button>
      <button
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="button"
        onClick={handleCancel}
      >
        Cancelar
      </button>
    </form>
  );
};

export default FormProject;
