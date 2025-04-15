module.exports = {
  development: {
    username: process.env.DB_USER || "myenjaz",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
  production: {
    username: process.env.DB_USER || "myenjaz",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "mydatabase",
    host: process.env.DB_HOST || "db",
    port: process.env.DB_PORT || 5432,
    dialect: "postgres",
  },
};