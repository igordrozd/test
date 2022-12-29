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
    type: {
      type: DataTypes.STRING 
    },
    depth: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    color: {
      type: DataTypes.STRING,
      defaultValue: "#100000"
    },
    start: {
      type: DataTypes.DATE
    },
    end: {
      type: DataTypes.DATE
    },
    

    dependability: {
      type: DataTypes.INTEGER
    }

});

Task.belongsTo(User, {
  foreignKey: 'userId'
});
Task.belongsTo(Icon, {
  foreignKey: 'iconId'
});

module.exports = Task;