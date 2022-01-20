require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const route = require("./route/index.route");
const morgan = require("morgan");
const path = require("path");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");


// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// set body-parse to parse req.body
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());

// set static folder
app.use(express.static(path.join(__dirname, "public")));

//	HTTP logger
// app.use(morgan("combined"));

//view engine config
app.engine(
  ".hbs",
  hbs.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      formatTs: (ts) =>
        ts ? ts.toLocaleDateString("en-GB").split("/").reverse().join("/") : "",
      ifeq: (a, b) => (a === b ? "selected" : ""),
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", "./views");


// Routes
route(app);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
