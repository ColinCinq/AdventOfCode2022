module.exports = function (server, handler) {
    server.get("/", handler.renderIndex);
    server.post("/day:day", handler.renderDaily);
    server.get("*", handler.render404);
};
