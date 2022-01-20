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
        res.json({ data, message: "Liên Kết Thành Công" });
      })
      .catch((err) => console.log(err));
  }

  // [PUT] /api/payment - payment
  paymentWallet(req, res) {
    //Payment cart and minus sodu
    const { id, amount } = req.body;
    const idWalletManager = 1000;
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
            const sqlWalletManager = `update public."User" set "sodu" = "sodu" + ${amount} where "id" = ${idWalletManager}`;
            const insertHistory = `insert into public."History" ("id_user", "amount") values (${id}, ${amount})`;
            db.query(insertHistory);
            db.query(sqlWalletManager);
            db.query(sql)
              .then((data) => {
                res.json({ message: "Thanh toán thành công" });
                return;
              })
              .catch((err) => console.log(err));
          }
        }
      })
      .catch((err) => console.log(err));
  }
}

module.exports = new apiController();
