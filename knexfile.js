const path = require("path");

require("dotenv").config();

const {
  DATABASE_URL = "postgresql://postgres@localhost/postgres",
  PRODUCTION_DATABASE_URL = "postgresql://postgres@localhost/postgres"
} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://mtzeimin:ugopu27yh_QwiQ1HMde7dz0QdCaZPkjP@hansken.db.elephantsql.com/mtzeimin",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://mtzeimin:ugopu27yh_QwiQ1HMde7dz0QdCaZPkjP@hansken.db.elephantsql.com/mtzeimin",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
