const express = require("express");
const postController = require("../controllers/post");

const router = express.Router();

router.get("/post-test", postController.testPost);

module.exports = router;