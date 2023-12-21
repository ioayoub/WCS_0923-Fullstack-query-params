const express = require("express");

const router = express.Router();

const articlesRouter = require("./routers/articlesRouter");

router.use("/articles", articlesRouter);

module.exports = router;
