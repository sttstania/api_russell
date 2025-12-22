const express = require("express");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");

const userApiRoutes = require('./routes/usersRoutes')

const app = express();

connectDB();
// Middlewares globaux
app.use(express.json());



// Routes Views

// Routes API
app.use("/User", userApiRoutes);

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
