import List from "./List";
import { Navbar } from "./Navbar";

export interface ListItem {
  id: number;
  text: string;
}

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
  } catch (error) {
    console.error(error);
  }
}

export const Aplication = () => {
  const myList: ListItem[] = [
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
  ];
  getProjects();
  return (
    <>
      <Navbar></Navbar>
      <List items={myList} />
    </>
  );
};
