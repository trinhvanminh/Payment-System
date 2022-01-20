const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const { verifyToken } = require("../jwt");

// Ví dụ về route có middleware. auth là 1 middleware - phải pass qua mới được truy cập vào controller
router.get("/login", verifyToken, usersController.loginView);
router.post("/login", usersController.login);
router.get("/register", verifyToken, usersController.registerView);
router.post("/register", usersController.register);
router.get("/logout", usersController.logout);

module.exports = router;
