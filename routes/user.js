const express = require("express");
const userController = require("../controllers/user");
const { auth } = require('../middlewares/auth');

const router = express.Router();

// TODO: Change different routes for login/register to same route different method 
router.get("/user-test", auth, userController.testUser);
router.get("/profile/:id", auth, userController.getProfile);
router.get("/list/:page", auth, userController.listUsers);
router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;