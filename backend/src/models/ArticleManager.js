const AbstractManager = require("./AbstractManager");

class ArticleManager extends AbstractManager {
  constructor() {
    super({ table: "article" });
  }

  async readAll(orderby, pricemax, limit) {
    const sql = `SELECT * FROM ${this.table}`;

    const sqlParams = [];

    // Create an object with the SQL clauses we want to use, allows to check the correct order of the clauses
    const sqlClause = { pricemax: "", orderby: "", limit: "" };

    // Add an array of valid values for the order by clause, allowing us to prevent SQL injection
    const orderValues = ["ASC", "DESC"];

    if (pricemax > 0) {
      sqlClause.pricemax = "WHERE price < ?";
      sqlParams.push(pricemax);
    }

    // Prevent SQL injection by checking that the value of orderby is in the array of valid values
    if (orderby && orderValues.includes(orderby)) {
      sqlClause.orderby = `ORDER BY title ${orderby}`;
    }

    if (limit) {
      sqlClause.limit = "LIMIT ?";
      sqlParams.push(limit);
    }

    const [rows] = await this.database.query(
      `${sql} ${Object.values(sqlClause).join(" ")}`,
      sqlParams
    );

    return rows;
  }
}

module.exports = ArticleManager;
