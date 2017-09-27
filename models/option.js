const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const option = sequelize.define('option', {
    option_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    option: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    option_value: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'option'
});

module.exports = option;