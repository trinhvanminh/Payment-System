const router = require("express").Router();
const usersController = require("../controllers/users.controller");
const { verifyToken } = require("../jwt");

// Ví dụ về route có middleware. auth là 1 middleware - phải pass qua mới được truy cập vào controller
router.get("/login", verifyToken, usersController.loginView);
router.post("/login", usersController.login);
router.get("/changepassword", verifyToken, usersController.changepasswordView);
router.post("/changepassword", verifyToken, usersController.changepassword);
router.get("/logout", usersController.logout);

module.exports = router;
