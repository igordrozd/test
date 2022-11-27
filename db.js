const { Sequelize } = require('sequelize');

module.exports = new Sequelize('ptk', 'postgres', '1102', {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
    port: 5432,
});