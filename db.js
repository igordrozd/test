const { Sequelize } = require('sequelize');

module.exports = new Sequelize('ptk', 'postgres', 'Lizaazil228', {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
    port: 5432,
});