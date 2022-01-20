const router = require("express").Router();
const apiController = require("../controllers/api.controller");
const { verifyToken } = require("../jwt");
// GET - Lấy data từ ví để connect
router.get("/connect-wallet/:id", apiController.connectWallet);
// PUT - Thanh toán tiền từ App sang hệ thống thanh toán
router.patch("/payment", apiController.paymentWallet);

module.exports = router;
