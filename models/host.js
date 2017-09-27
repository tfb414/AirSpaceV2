const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const host = sequelize.define('host', {
    host_id: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    first_name: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    last_name: {
      type: Sequelize.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'host'
});

module.exports = host;