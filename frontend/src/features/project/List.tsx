import React from "react";
import { Project } from "../../type/Project";
import { ProjectItem } from "./ProjectItem";

interface ListProps {
  items: Project[];
}

const List: React.FC<ListProps> = ({ items }) => {
  const handleDelete = (id: number) => {
    console.log("id", id);
  };

  const handleEdit = (id: number) => {
    console.log("id", id);
  };

  return (
    <ul className="divide-y divide-gray-300 rounded-lg overflow-hidden  border-gray-300 mt-5">
      {items.map((item) => (
        <ProjectItem
          key={item.id}
          item={item}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </ul>
  );
};

export default List;
