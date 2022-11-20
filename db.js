const { Sequelize } = require('sequelize');

module.exports = new Sequelize('ptk', 'postgres', 'postgres', {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
    port: 5432,
});