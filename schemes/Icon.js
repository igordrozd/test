const { DataTypes } = require('sequelize');
const database = require('../db');

module.exports = database.define('Icon', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING 
    },
    url: {
        type: DataTypes.STRING 
    }
});;