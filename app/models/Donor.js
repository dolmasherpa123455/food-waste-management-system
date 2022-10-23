const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../config/database');
const User = require('./User');

const Donor = sequelize.define(
  'donor',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    address: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      defaultValue: 'REQUESTED',
    },
    notes: {
      type: DataTypes.STRING
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['id'],
      },
    ],
  },
);
// Donor.belongsTo(User, { as: 'user', foreignKey: 'userId' });
module.exports = Donor;
