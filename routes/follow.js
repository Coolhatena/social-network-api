const express = require("express");
const followController = require("../controllers/follow");

const router = express.Router();

router.get("/follow-test", followController.testFollow);

module.exports = router;