const bcrypt = require("bcrypt");
const { createTokens } = require("../jwt");
const db = require("../db");

class apiController {
  // [GET] /api/connect-wallet - connect wallet
  connectWallet(req, res) {
    // get data with ID
    const id = req.params.id;
    const sql = `select * from public."User" where "id" = ${id}`;
    db.query(sql)
      .then((data) => {
        res.json(data);
      })
      .catch((err) => console.log(err));
  }


  // [PUT] /api/payment - payment
  paymentWallet(req, res) {}
}

module.exports = new apiController();
