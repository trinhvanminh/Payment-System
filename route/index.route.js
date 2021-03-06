const { verifyToken } = require("../jwt");

function route(app) {
  app.use("/auth", verifyToken, require("./users.route"));
  app.use("/api",require("./api.route"));
  app.use("/", require("./site.route"));
}

module.exports = route;
