const express = require("express");
const path = require("path");

const app = express();

// middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// route test
app.get("/", (req, res) => {
  res.send("Port de Plaisance Russell API");
});

module.exports = app;
