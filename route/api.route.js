const router = require("express").Router();
const apiController = require("../controllers/api.controller");
const { verifyToken } = require("../jwt");
// GET - Lấy data từ ví để connect
router.get("/connect-wallet/:id",verifyToken, apiController.connectWallet);
// PUT - Thanh toán tiền từ App sang hệ thống thanh toán
router.put("/payment",verifyToken, apiController.paymentWallet);

// GET - Lịch Sử Giao Dịch/ Thanh Toán
router.put("/history",verifyToken, apiController.historyPayment);

module.exports = router;
