const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const articles = await tables.article.readAll();

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse };
