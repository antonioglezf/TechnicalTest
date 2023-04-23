import server from "../src/app";
import { test } from "tap";
import { faker } from "@faker-js/faker";

const email: string = faker.internet.email();
const name: string = faker.name.firstName();
const password: string = faker.internet.password();
let token: string;

test("requests the `/register` route", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/register",
    payload: {
      email,
      password,
      name,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.ok(response.json().token);
  token = response.json().token;
  t.end();
});

let idProjectAdded: number;
test("requests the `/addproject` route", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/projects/add",
    headers: {
      "auth-token": `${token}`,
    },
    payload: {
      title: "Test Project",
      status: "active",
      description: "This is a test project",
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  idProjectAdded = response.json().project.id;
  t.end();
});

test("requests the `/projects` route", async (t) => {
  const response = await server.inject({
    method: "GET",
    url: "/api/projects",
    headers: {
      "auth-token": `${token}`,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Projects fetched successfully");
  t.ok(response.json().projects);
  t.end();
});

test("requests the `/update` route not found", async (t) => {
  const proyecto = {
    id: 999999999,
    title: "Proyecto actulizado",
    description: "Project Description",
  };
  const response = await server.inject({
    method: "PUT",
    url: "/api/projects/update",
    headers: {
      "auth-token": `${token}`,
    },
    payload: proyecto,
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 404);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Project not found");
  t.end();
});

test("requests the `/update` route check failed if not id", async (t) => {
  const proyecto = {
    idFailed: 1,
    faile: "Proyecto actulizado",
  };
  const response = await server.inject({
    method: "PUT",
    url: "/api/projects/update",
    headers: {
      "auth-token": `${token}`,
    },
    payload: proyecto,
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 500);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.end();
});

test("requests the `/update` route not found", async (t) => {
  const proyecto = {
    id: 999999999,
    title: "Proyecto actulizado",
    description: "Project Description",
  };
  const response = await server.inject({
    method: "PUT",
    url: "/api/projects/update",
    headers: {
      "auth-token": `${token}`,
    },
    payload: proyecto,
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 404);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Project not found");
  t.end();
});

test("requests the `/update` route not user authroization", async (t) => {
  const responseNewUser = await server.inject({
    method: "POST",
    url: "/api/register",
    payload: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
    },
  });
  const tokenNewUser = responseNewUser.json().token;

  const projectOtherUser = {
    id: idProjectAdded,
    title: "Proyecto actulizado",
    description: "Project Description",
  };

  const response = await server.inject({
    method: "PUT",
    url: "/api/projects/update",
    headers: {
      "auth-token": `${tokenNewUser}`,
    },
    payload: projectOtherUser,
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 401);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Unauthorized");
  t.end();
});

test("requests the `/update` okay", async (t) => {
  const projectOtherUser = {
    id: idProjectAdded,
    title: "Proyecto actulizado",
    description: "Project Description",
    status: "not-started",
  };

  const response = await server.inject({
    method: "PUT",
    url: "/api/projects/update",
    headers: {
      "auth-token": `${token}`,
    },
    payload: projectOtherUser,
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.end();
});
