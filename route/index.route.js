const { verifyToken } = require("../jwt");

function route(app) {
  app.use("/auth", verifyToken, require("./users.route"));
  app.use("/manager", require("./manager.route"));
  app.use("/list-product", require("./product.route"));
  app.use("/package-product", require("./packageProduct.route"));
  app.use("/admin", require("./admin.route"));
  app.use("/user", require("./userSystem.route"));
  app.use("/", require("./site.route"));
}

module.exports = route;
