const bcrypt = require("bcrypt");
const { createTokens } = require("../jwt");

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
      .query('select "password" from public."User" where "username" = $1', [
        req.body.username,
      ])
      .then((data) => {
        if (data.rowCount == 0) {
          console.log("khong ton tai user");
          res.render("./auth/login", {
            message: "tai khoan hoac mk khong chinh xac",
            type: "warning",
          });
        } else {
          // Load hash from your password DB.
          bcrypt
            .compare(req.body.password, data.rows[0].password)
            .then((match) => {
              if (match) {
                console.log("login thanh cong");
                const accessToken = createTokens({
                  username: req.body.username,
                });
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
  // [GET] /auth/register
  registerView(req, res, next) {
    if (req.authenticated) {
      res.redirect("/");
    } else {
      res.render("./auth/register");
    }
  }
  // [POST] /auth/register
  register(req, res, rext) {
    const { username, password1, password2 } = req.body;
    // confirm mat khau
    if (password1 !== password2) {
      console.log("use js to handle");
      res.render("./auth/register", {
        message: "mat khau khong khop",
        type: "warning",
      });
    } else {
      // if exist username
      require("../db")
        .query('select * from public."User" where "username" = $1', [username])
        .then((data) => {
          if (data.rowCount >= 1) {
            console.log("login khong thanh cong");
            res.render("./auth/register", {
              message: "da ton tai username",
              type: "warning",
            });
          } else {
            bcrypt.hash(password1, 10).then((hash) => {
              // Store hash in your password DB.
              require("../db")
                .query(
                  'INSERT INTO "User"(username, password) VALUES ($1, $2)',
                  [username, hash]
                )
                .then((data) => {
                  if (data.rowCount === 1) {
                    res.render("./auth/register", {
                      message: "Register thanh cong",
                      type: "success",
                    });
                  } else {
                    res.render("./auth/register", {
                      message: "Loi insert db",
                      type: "danger",
                    });
                  }
                });
            });
          }
        });
    }
  }
  // [GET] /auth/logout
  logout(req, res, next) {
    if (req.cookies["access-token"]) {
      res.clearCookie("access-token");
    }
    res.redirect("/");
  }
}

module.exports = new usersController();
