const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const host_guest = sequelize.define('host_guest', {
    host_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'host',
        key: 'host_id'
      }
    },
    guest_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'guest',
        key: 'guest_id'
      }
    }
  }, {
    tableName: 'host_guest'
});

module.exports = host_guest;
