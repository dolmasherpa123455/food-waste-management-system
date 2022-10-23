const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');
const Comment = require('./Comment');

const Donation = sequelize.define(
  'donations',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    sourceLocation: DataTypes.STRING,
    image: DataTypes.TEXT,
    suitable_for: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User, // 'fathers' refers to table name
        key: 'id', // 'id' refers to column name in fathers table
      },
    },
    type: DataTypes.STRING,
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {},
);
Donation.belongsTo(User, { as: 'user', foreignKey: 'userId' });
Donation.hasMany(Comment, { as: 'comments', foreignKey: 'donationId' });
module.exports = Donation;
