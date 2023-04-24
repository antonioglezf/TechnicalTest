import React, { useEffect, useState } from "react";
import { Project } from "../../type/Project";
import { ProjectItem } from "./ProjectItem";
import FormProject from "./FormProject";
import NoProjectsFound from "./NoProjectsFound";

const List: React.FC = () => {
  const [editMode, setEditMode] = useState(false);
  const [editProject, setEditProject] = useState<Project | undefined>(
    undefined
  );
  const [myList, setMyList] = useState<Project[]>([]);

  async function getProjects(): Promise<Project[]> {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(`Failed to get token`);
    }
    try {
      const response = await fetch("http://localhost:3000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to get projects");
      }
      const data = await response.json();
      console.log("Projects:", data);
      const projects: Project[] = data.projects;
      return projects;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async function loadProjects(): Promise<void> {
    try {
      const projects = await getProjects();
      setMyList(projects);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = (id: number) => {
    console.log("id ", id);
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(`Failed to get token`);
    }
    fetch(`http://localhost:3000/api/projects/delete/${id}`, {
      method: "DELETE",
      headers: {
        "auth-token": token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to delete project");
        }
      })
      .then((data) => {
        console.log("Project deleted:", data);
        const updatedList = myList.filter((p) => p.id !== id);
        setMyList(updatedList);
      })
      .catch((error) => {
        console.error("Error deleting project:", error.message);
      });
  };

  const handleEdit = (id: number) => {
    const project = myList.find((item) => item.id === id);
    if (project) {
      setEditProject(project);
      setEditMode(true);
    }
  };

  const handleCancel = () => {
    setEditProject(undefined);
    setEditMode(false);
  };

  async function handleSave(project: Project): Promise<void> {
    setEditProject(undefined);
    setEditMode(false);
    await updateProject(project);
    await loadProjects();
  }

  async function updateProject(project: Project): Promise<void> {
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
    console.log("Project updated:", project);
  }

  return (
    <>
      {myList.length && !editMode ? (
        <ul className="divide-y divide-gray-300 rounded-lg overflow-hidden border-gray-300 mt-5">
          {myList.map((item) => (
            <ProjectItem
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))}
        </ul>
      ) : (
        <>
          {editMode ? (
            <FormProject
              project={editProject!}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          ) : (
            <NoProjectsFound />
          )}
        </>
      )}
    </>
  );
};

export default List;
