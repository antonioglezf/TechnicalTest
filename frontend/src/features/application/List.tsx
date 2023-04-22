import React from "react";
import { Project } from "../../type/Project";

interface ListProps {
  items: Project[];
}

const List: React.FC<ListProps> = ({ items }) => {
  const handleDelete = (id: number) => {
    console.log("id");
  };

  const handleEdit = (id: number) => {
    console.log("id");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <ul className="divide-y divide-gray-300 rounded-lg overflow-hidden  border-gray-300 mt-5">
        {items.map((item) => (
          <li
            key={item.id}
            className="py-5 px-2 sm:px-4 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-1 flex flex-col">
                <span className="text-gray-900 font-medium">{item.title}</span>
                <span className="text-gray-500 text-sm">
                  Estado: {item.status}
                </span>
                {item.startDate ? (
                  <span className="text-gray-500 text-sm">
                    Inicio: {new Date(item.startDate).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
              <div className="col-span-1 flex flex-col">
                <span className="text-gray-500 text-sm">
                  {item.description}
                </span>
              </div>
              <div className="px-2 sm:px-4 col-span-1 flex flex-col justify-start items-end justify-items-end">
                <button
                  className="text-red-500 font-medium hover:text-red-700 mt-1 flex items-center"
                  onClick={() => handleDelete(item.id)}
                >
                  Eliminar
                </button>
                <button
                  className="text-blue-500 font-medium hover:text-blue-700 mt-1"
                  onClick={() => handleEdit(item.id)}
                >
                  Editar
                </button>
                {item.endDate ? (
                  <span className="text-gray-500 text-sm">
                    Fin:{new Date(item.endDate).toLocaleDateString()}
                  </span>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
