const express = require("express");
const router = express.Router();
const siteController = require("../controllers/site.controller");
const { verifyToken } = require("../jwt");

router.get("/", verifyToken, siteController.index);
router.get("/*", verifyToken, siteController.stuff);
module.exports = router;
