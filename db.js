const { Sequelize } = require('sequelize');

module.exports = new Sequelize('ptk', 'postgres', '27062006vF', {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
    port: 5432,
});