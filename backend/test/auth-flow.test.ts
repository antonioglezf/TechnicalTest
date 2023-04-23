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
  t.equal(response.json().message, "User registered successfully");
  t.ok(response.json().token);
  t.end();
});

test("requests the `/register` route failed by existingUser", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/register",
    payload: {
      email,
      password,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 409);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "User with this email already exists");
  t.notOk(response.json().token);
  t.end();
});

test("requests the `/login` route", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/login",
    payload: {
      email,
      password,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 200);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "User is logged successfully");
  t.ok(response.json().token);
  token = response.json().token;
  t.ok(response.json().name);
  t.end();
});

test("requests the `/login` route user not existing", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/login",
    payload: {
      email: "emailfake",
      password,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 401);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Invalid email or password");
  t.end();
});

test("requests the `/login` route password not matched", async (t) => {
  const response = await server.inject({
    method: "POST",
    url: "/api/login",
    payload: {
      email,
      password: "passwordfake",
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 401);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Invalid email or password");
  t.end();
});

test("token is invalid", async (t) => {
  const response = await server.inject({
    method: "GET",
    url: "/api/validate",
    headers: {
      "auth-token": `${token}1`,
    },
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 401);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Invalid Token");
  t.end();
});

test("unauthorized", async (t) => {
  const response = await server.inject({
    method: "GET",
    url: "/api/validate",
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 401);
  t.equal(response.headers["content-type"], "application/json; charset=utf-8");
  t.equal(response.json().message, "Access Denied");
  t.end();
});
