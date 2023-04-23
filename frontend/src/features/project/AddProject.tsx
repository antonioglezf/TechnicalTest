import React, { useState } from "react";
import FormProject from "./FormProject";
import { Project } from "../../type/Project";
import { useNavigate } from "react-router-dom";

export const AddProject = () => {
  const [project, setProject] = useState<Project>({
    id: 1,
    title: "",
    status: "not-started",
  });

  const handleProjectChange = (updatedProject: Project) => {
    setProject(updatedProject);
  };
  const navigate = useNavigate();

  function onSave(project: Project): void {
    createProject(project).then(() => {
      navigate("/project");
    });
  }
  function onCancel(): void {
    const myProject = {
      id: 0,
      title: "",
      status: "not-started",
    };
    setProject(myProject);
  }
  const createProject = async (project: Project) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Authentication token is missing");
    }

    const response = await fetch("http://localhost:3000/api/projects/add", {
      method: "POST",
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

  return <FormProject project={project} onSave={onSave} onCancel={onCancel} />;
};
