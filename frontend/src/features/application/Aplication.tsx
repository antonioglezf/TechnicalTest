import { useEffect, useState } from "react";
import { Project } from "../../type/Project";
import List from "./List";
import { Navbar } from "./Navbar";

const Aplication = () => {
  const [myList, setMyList] = useState<Project[]>([]);

  async function getProjects() {
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
      console.log("Created project:", data);
      const projects: Project[] = data;
      return projects;
    } catch (error) {
      console.error(error);
    }
  }

  async function loadProjects() {
    try {
      const projects = await getProjects();
      if (projects) {
        setMyList(projects);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <List items={myList} />
    </>
  );
};

export default Aplication;
