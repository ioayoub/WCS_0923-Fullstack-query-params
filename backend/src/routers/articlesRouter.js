const express = require("express");

const router = express.Router();

const { browse } = require("../controllers/articlesController");

router.get("/", browse);

module.exports = router;
