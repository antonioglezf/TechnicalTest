import { Project } from "../../type/Project";
import List from "./List";
import { Navbar } from "./Navbar";

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

export const Aplication = () => {
  const myList: Project[] = [
    {
      id: 1,
      title: "Project Antonio",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi maximus leo ac magna viverra, quis viverra nunc lacinia. Nunc dictum luctus mi vitae finibus. Cras leo turpis, tincidunt non tempus a, placerat vitae risus. Cras eu nunc enim. Suspendisse id lorem leo. Donec id leo nisl. Aenean quis pulvinar ipsum. Nunc ornare orci sit amet euismod sagittis. Praesent luctus nibh at turpis volutpat vestibulum. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent hendrerit urna id dolor mattis, quis auctor tortor accumsan.",
      startDate: new Date("2023-05-01T00:00:00.000Z"),
      endDate: new Date("2023-06-30T23:59:59.000Z"),
      status: "in progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "Project Antonio",
      description: "Project Description",
      startDate: new Date("2023-05-01T00:00:00.000Z"),
      endDate: new Date("2023-06-30T23:59:59.000Z"),
      status: "in progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "Project AntonioA",
      description: "Project Description",
      startDate: new Date("2023-05-01T00:00:00.000Z"),
      endDate: new Date("2023-06-30T23:59:59.000Z"),
      status: "in progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: "Project AntonioA",
      description: "Project Description",
      startDate: new Date("2023-05-01T00:00:00.000Z"),
      endDate: new Date("2023-06-30T23:59:59.000Z"),
      status: "in progress",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  return (
    <>
      <Navbar></Navbar>
      <List items={myList} />
    </>
  );
};
