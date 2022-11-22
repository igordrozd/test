const { DataTypes } = require('sequelize');
const database = require('../db');

const User = database.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING 
    },
    password: {
      type: DataTypes.STRING

    },
    
});

module.exports = User;