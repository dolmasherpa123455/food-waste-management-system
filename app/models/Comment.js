const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Donation = require('./Donation');

const Comment = sequelize.define(
  'comments',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    donationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'donations', 
        key: 'id', // 'id' refers to column name in fathers table
      },
    },
    message: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users', 
        key: 'id', // 'id' refers to column name in fathers table
      },
    },
  },
  {},
);
console.log(User)
// Comment.belongsTo(Donation);
Comment.belongsTo(User);
module.exports = Comment;
