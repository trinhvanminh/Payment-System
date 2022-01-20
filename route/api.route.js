const router = require("express").Router();
const apiController = require("../controllers/api.controller");
const { verifyToken } = require("../jwt");

router.get("/connect-wallet/:id", apiController.connectWallet);
router.put("/payment", apiController.paymentWallet);

module.exports = router;
