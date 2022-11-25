const { DataTypes } = require('sequelize');
const database = require('../db');
const Icon = require('./Icon'); 
const User = require('./User');

const Task = database.define('Task', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING 
    },
    TypeTask: {
      type: DataTypes.INTEGER 
    },
    Timestart: {
      type: DataTypes.TIME
    },
    Timeend: {
      type: DataTypes.TIME
    }

});

Task.belongsTo(User, {
  foreignKey: 'userId'
});
Task.belongsTo(Icon, {
  foreignKey: 'iconId'
});

module.exports = Task;

module.exports = Task;