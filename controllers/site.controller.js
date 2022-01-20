class SiteController {
  // GET /
  index(req, res, next) {
    res.render("home", { authenticated: req.authenticated });
  }

  // GET /*
  stuff(req, res, next) {
    res.redirect("/");
  }
}

module.exports = new SiteController();
