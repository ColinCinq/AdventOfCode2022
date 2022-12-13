module.exports = function (server, handler) {
  server.get("/", handler.renderIndex);
  server.get("/day:day", handler.renderDaily);
  server.get("*", handler.render404);
};
