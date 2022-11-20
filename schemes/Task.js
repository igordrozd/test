const { DataTypes } = require('sequelize');
const database = require('../db');

module.exports = database.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING 
    },
    time: {
      type: DataTypes.TIME
    },
    icon: {
      type: DataTypes.INTEGER 
    }
});;

