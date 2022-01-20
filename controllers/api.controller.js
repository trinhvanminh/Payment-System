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
  paymentWallet(req, res) {
    //Payment cart and minus sodu
    const { id, amount } = req.body;

    const sql = `select * from public."User" where "id" = ${id}`;
    db.query(sql)
      .then((data) => {
        const balance = data.rows[0].sodu;
        if (balance < 0) {
          res.json({
            message: "Số dư không đủ để thanh toán",
          });
        } else {
          const newBalance = balance - amount;
          if (newBalance < 0) {
            res.json({
              message: "Số dư không đủ để thanh toán",
            });
          } else {
            const sql = `update public."User" set "sodu" = ${newBalance} where "id" = ${id}`;
            db.query(sql)
              .then((data) => {
                res.json({ data: data, message: "Thanh toán thành công" });
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new apiController();
