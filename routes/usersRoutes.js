const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");


// EJS
router.get("/newUser", userController.renderNewUser);
router.post("/newUser", userController.createUserFromForm);    // Render the create user form
router.get("/profileUser", userController.renderProfileUser);    // Render the logged-in user profile
router.get("/:id/edit", userController.renderEditUser);      // Render edit user form
router.post("/:id/edit", userController.updateUserFromForm);  
router.put("/:id", userController.updateUserFromForm);


// API
router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get('/by-email', userController.getUserByEmail);

// dynamique - last ones
router.get('/:id', userController.getUserById);
router.put("/:id", userController.updateUser);
router.patch('/:id', userController.patchUser);
router.delete("/:id", userController.deleteUser);


module.exports = router;
