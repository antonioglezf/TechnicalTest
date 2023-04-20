import server from "./app";

server
  .listen({
    port: 3000,
    host: "0.0.0.0",
  })
  .then((address) => {
    const port = typeof address === "string" ? address : (address as any)?.port;
    server.log.info(`Server listening on port ${port}`);
  })
  .catch((err) => {
    server.log.error(err);
    process.exit(1);
  });
