const express = require("express");
const methodOverride = require("method-override");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");

const userApiRoutes = require('./routes/usersRoutes')

const app = express();

if (process.env.NODE_ENV !== "test") connectDB();
// Middlewares globaux
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Method Override for PUT/PATCH/DELETE - form
app.use(methodOverride('_method'));

// Routes Views
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes API
app.use("/users", userApiRoutes);

// start serveur if not testing
if (process.env.NODE_ENV != "test") {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
