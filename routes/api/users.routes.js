const express = require("express");
const router = express.Router();
const { getUsers, createUser, getUserById, updateUser, deleteUser } = require("../../controllers/userController");
const { getUserById } = require("../../services/userService");
// const authMiddleware = require("../../middlewares/auth.middleware");

// router.use(authMiddleware);

router.get("/", getUsers);
router.post("/", createUser);
router.get('/:id', getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
