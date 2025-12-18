const express = require("express");
const path = require("path");


const authRoutes = require("./routes/api/auth.routes");
const catwayRoutes = require("./routes/api/catways.routes");
const reservationRoutes = require("./routes/api/reservations.routes");


const app = express();


// middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// route test
// app.get("/", (req, res) => {
//   res.send("Port de Plaisance Russell API");
// });

// Views
app.get("/", (req, res) => res.render("index"));
app.get("/documentation", (req, res) => res.render("documentation"));

// API
app.use("/api/auth", authRoutes);
app.use("/api/catways", catwayRoutes);
app.use("/api/catways", reservationRoutes);


module.exports = app;