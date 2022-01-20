const bcrypt = require("bcrypt");
const { createTokens } = require("../jwt");
const db = require("../db");

class usersController {
  //[GET] /auth/login
  loginView(req, res, next) {
    if (req.authenticated) {
      res.redirect("/");
    } else {
      res.render("./auth/login");
    }
  }
  //[POST] /auth/login
  login(req, res, rext) {
    require("../db")
      .query('select "password" from public."User" where "id" = $1', [
        req.body.id,
      ])
      .then((data) => {
        console.log(data);

        if (data.rowCount == 0) {
          console.log("khong ton tai user");
          res.render("./auth/login", {
            message: "tai khoan hoac mk khong chinh xac",
            type: "warning",
          });
        } else if (data.rowCount == 1 && data.rows[0].password === "") {
          console.log("login thanh cong");
          const accessToken = createTokens({
            id: req.body.id,
          });

          res.cookie("id-login", req.body.id);
          res.cookie("access-token", accessToken);
          res.redirect("/");
        } else {
          // Load hash from your password DB.
          bcrypt
            .compare(req.body.password, data.rows[0].password)
            .then((match) => {
              if (match) {
                console.log("login thanh cong");
                const accessToken = createTokens({
                  id: req.body.id,
                });
                res.cookie("id-login", req.body.id);
                res.cookie("access-token", accessToken);
                res.redirect("/");
              } else {
                console.log("sai mat khau");
                res.render("./auth/login", {
                  message: "tai khoan hoac mk khong chinh xac",
                  type: "warning",
                });
              }
            })
            .catch((err) => console.log(err));
          //
        }
      })
      .catch((err) => console.log(err));
  }
  // [GET] /auth/ change password view engine
  changepasswordView(req, res) {
    res.render("./auth/changePassword", { authenticated: req.authenticated });
  }

  //[POST] /auth/changepassword
  changepassword(req, res) {
    const { id, password, newpassword } = req.body;
    db.query('select "password" from public."User" where "id" = $1', [
      req.body.id,
    ]).then((data) => {
      if (data.rowCount == 0) {
        res.render("./auth/changePassword", {
          message: "tai khoan hoac mk khong chinh xac",
          type: "warning",
        });
      } else if (data.rowCount == 1 && data.rows[0].password === "") {
        bcrypt
          .hash(newpassword, 10)
          .then((hash) => {
            db.query(
              'update public."User" set "password" = $1 where "id" = $2',
              [hash, id]
            );
            res.render("./auth/changePassword", {
              message: "doi mat khau thanh cong",
              type: "success",
            });
          })
          .catch((err) => console.log(err));
      } else {
        // Load hash from your password DB.
        bcrypt
          .compare(password, data.rows[0].password)
          .then((match) => {
            if (match) {
              bcrypt
                .hash(newpassword, 10)
                .then((hash) => {
                  db.query(
                    'update public."User" set "password" = $1 where "id" = $2',
                    [hash, id]
                  );
                  res.render("./auth/changePassword", {
                    message: "doi mat khau thanh cong",
                    type: "success",
                  });
                })
                .catch((err) => console.log(err));
            } else {
              res.render("./auth/changePassword", {
                message: "sai mat khau cu",
                type: "warning",
              });
            }
          })
          .catch((err) => console.log(err));
      }
    });
  }

  // [GET] /auth/register
  registerView(req, res) {
    res.render("./auth/register", { authenticated: req.authenticated });
  }

  //[POST] /auth/register
  register(req, res) {
    const { id, password1, password2 } = req.body;
    const sodu = 0;
    const role = "manager";
    if (password1 !== password2) {
      res.render("./auth/register", {
        message: "mat khau khong trung khop",
        type: "warning",
      });
    } else {
      bcrypt
        .hash(password1, 10)
        .then((hash) => {
          db.query(
            'insert into public."User"("id", "password","sodu","role") values ($1, $2, $3, $4)',
            [id, hash, sodu, role]
          );
          res.render("./auth/register", {
            message: "dang ky thanh cong",
            type: "success",
          });
        })
        .catch((err) => console.log(err));
    }
  }

  // [GET] /auth/logout
  logout(req, res, next) {
    if (req.cookies["access-token"]) {
      res.clearCookie("access-token");
    }
    res.redirect("/");
  }

  // [GET] /auth/recharge
  rechargeView(req, res) {
    res.render("./auth/recharge", { authenticated: req.authenticated });
  }

  //[POST] /auth/recharge
  recharge(req, res) {
    const { sotiennap } = req.body;
    const id = req.cookies["id-login"];
    db.query('update public."User" set "sodu" = "sodu" + $1 where "id" = $2', [
      sotiennap,
      id,
    ]);
    res.render("./auth/recharge", {
      message: "nap tien thanh cong",
      type: "success",
    });
  }

  // [GET] /auth/balance
  balanceView(req, res) {
    const id = req.cookies["id-login"];
    db.query('select "sodu" from public."User" where "id" = $1', [id]).then(
      (data) => {
        res.render("./auth/balance", {
          authenticated: req.authenticated,
          sodu: data.rows[0].sodu,
        });
      }
    );
  }
}

module.exports = new usersController();
