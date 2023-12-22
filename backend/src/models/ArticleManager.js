const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  async readAll(orderby, pricemax, limit) {
    const sql = `SELECT * FROM ${this.table}`;

    const sqlParams = [];
    const sqlClause = [];

    if (pricemax > 0) {
      sqlClause.push("WHERE price < ?");
      sqlParams.push(pricemax);
    }

    if (orderby) {
      sqlClause.push(`ORDER BY title ${orderby}`);
      sqlParams.push(orderby);
    }

    if (limit) {
      sqlClause.push("LIMIT ?");
      sqlParams.push(limit);
    }

    const [rows] = await this.database.query(
      `${sql} ${sqlClause.join(" ")}`,
      sqlParams
    );

    return rows;
  }
}

module.exports = ArticleManager;
