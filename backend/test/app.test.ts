import server from "../src/app";
import { test } from "tap";

test('requests the "/" route', async (t: any) => {
  const response = await server.inject({
    method: "GET",
    url: "/",
  });
  console.log("status code: ", response.statusCode);
  t.equal(response.statusCode, 404);
});
