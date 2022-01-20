const { sign, verify } = require("jsonwebtoken");
const createTokens = ({ username }) => {
  const accessToken = sign({ username: username }, "privatekeygoeshere", {
    expiresIn: "10d",
  });
  return accessToken;
};

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies["access-token"];
  if (!accessToken) {
    req.authenticated = false;
    return next();
  }

  try {
    const validToken = verify(accessToken, "privatekeygoeshere");
    if (validToken) {
      req.authenticated = true;
      return next();
    } else {
      res.clearCookie("access-token");
      return res.redirect("/");
    }
  } catch (err) {
    res.clearCookie("access-token");
    return res.redirect("/");
  }
};

module.exports = { createTokens, verifyToken };
