const express = require("express");
const userController = require("../controllers/user");
const { auth } = require('../middlewares/auth');

const router = express.Router();

router.get("/user-test", auth, userController.testUser);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;