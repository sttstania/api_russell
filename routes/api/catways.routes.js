const express = require("express");
const router = express.Router();
const {
  getAllCatways,
  getCatway,
  createCatway,
  updateCatway,
  deleteCatway
} = require("../../controllers/catwayController");
// const authMiddleware = require("../../middlewares/auth.middleware");

// router.use(authMiddleware);

router.get("/", getAllCatways);
router.get("/:id", getCatway);
router.post("/", createCatway);
router.put("/:id", updateCatway);
router.patch("/:id", updateCatway);
router.delete("/:id", deleteCatway);

module.exports = router;
