const tables = require("../tables");

const browse = async (req, res, next) => {
  const { orderby = null, pricemax = null, limit = null } = req.query;

  try {
    const articles = await tables.article.readAll(
      orderby,
      Number(pricemax),
      Number(limit)
    );

    res.json(articles);
  } catch (err) {
    next(err);
  }
};

module.exports = { browse };
