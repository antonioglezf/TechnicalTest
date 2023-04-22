import React from "react";
import { ListItem } from "./Aplication";

interface ListProps {
  items: ListItem[];
}

const List: React.FC<ListProps> = ({ items }) => {
  const handleDelete = (id: number) => {
    console.log("id");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ul className="border border-gray-300 divide-y divide-gray-300 rounded-lg ">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between px-4 py-2 hover:bg-gray-200"
          >
            <span>{item.text}</span>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
