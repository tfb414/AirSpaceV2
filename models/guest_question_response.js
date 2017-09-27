const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const guest_question_response = sequelize.define('guest_question_response', {
    guest_id: {
      type: Sequelize.STRING,
      allowNull: true,
      references: {
        model: 'guest',
        key: 'guest_id'
      }
    },
    question_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'question',
        key: 'question_id'
      }
    },
    response: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    option_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'option',
        key: 'option_id'
      }
    }
  }, {
    tableName: 'guest_question_response'
});


module.exports = guest_question_response;
