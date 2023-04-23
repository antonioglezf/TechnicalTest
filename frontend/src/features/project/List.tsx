import React, { useState } from "react";
import { Project } from "../../type/Project";
import { ProjectItem } from "./ProjectItem";

import FormProject from "./FormProject";

interface ListProps {
  items: Project[];
}

const List: React.FC<ListProps> = ({ items }) => {
  const [editMode, setEditMode] = useState(false);
  const [editProject, setEditProject] = useState<Project | undefined>(
    undefined
  );

  const handleDelete = (id: number) => {
    console.log("id ", id);
  };

  const handleEdit = (id: number) => {
    const project = items.find((item) => item.id === id);
    if (project) {
      setEditProject(project);
      setEditMode(true);
    }
  };

  const handleCancel = () => {
    setEditProject(undefined);
    setEditMode(false);
  };

  function handleSave(project: Project): void {
    setEditProject(undefined);
    setEditMode(false);
    updateProject(project);
  }

  const updateProject = async (project: Project) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await fetch("http://localhost:3000/api/projects/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(project),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message);
    }

    const newProject = await response.json();
    return newProject;
  };

  return (
    <>
      {editMode ? (
        <FormProject
          project={editProject!}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      ) : (
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
      )}
    </>
  );
};

export default List;
