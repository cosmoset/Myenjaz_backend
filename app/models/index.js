const Sequelize = require("sequelize");
const config = require("../config/config")[process.env.NODE_ENV || "development"];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    logging: console.log
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Admin = require("./admin")(sequelize, Sequelize.DataTypes);
db.Application = require("./application")(sequelize, Sequelize.DataTypes);

module.exports = db;