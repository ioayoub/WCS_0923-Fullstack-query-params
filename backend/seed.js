/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // Optional: Truncate tables (remove existing data)
    await database.query("truncate article");

    // Insert fake data into the 'item' table
    for (let i = 0; i < 100; i += 1) {
      queries.push(
        database.query(
          "insert into article(title, description, price, created_at) values (?,?,?,?)",
          [
            faker.commerce.productName(),
            faker.commerce.productDescription(),
            faker.commerce.price({ min: 1, max: 50 }),
            faker.date.between({ from: "2023-09-01", to: "2023-12-21" }),
          ]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();
