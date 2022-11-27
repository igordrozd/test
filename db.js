const { Sequelize } = require('sequelize');

module.exports = new Sequelize('ptk', 'postgres', 'postgres', {
    host: "0.0.0.0",
    storage: "./db/database.sqlite",
    dialect: 'sqlite',
    logging: false,
});