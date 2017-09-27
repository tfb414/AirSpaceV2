const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const guest = sequelize.define('guest', {
    guest_id: {
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
    tableName: 'guest'
});

module.exports = guest;
