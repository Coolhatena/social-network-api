const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.get("/user-test", userController.testUser);
router.get("/register", userController.register)

module.exports = router;