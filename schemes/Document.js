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
    fullName: {
      type: DataTypes.STRING 
    }
});
Document.belongsTo(User, {
  foreignKey: 'userId'
});
Document.hasMany(Task, {
  foreignKey: 'documentId'
});
Document.belongsTo(User, {
  foreignKey: 'lastChange'
});


module.exports = Document;