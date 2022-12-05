const { DataTypes } = require('sequelize');
const database = require('../db');
const Task = require('./Task');
const User = require('./User');

const Document = database.define('Document', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING 
    },
    creator: {
      type: DataTypes.STRING 
    },
    changer: {
      type: DataTypes.STRING 
    },
    type: {
      type: DataTypes.INTEGER
    }
});
Document.belongsTo(User, {
  foreignKey: 'userId'
});
Document.hasMany(Task, {
  foreignKey: 'documentId'
});
module.exports = Document;