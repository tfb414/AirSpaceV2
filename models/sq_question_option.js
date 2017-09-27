const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

sq_question_option = sequelize.define('sq_question_option', {
    sq_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sq',
        key: 'sq_id'
      }
    },
    option_id: {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'option',
        key: 'option_id'
      },
      unique: true
    },
    question_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'question',
        key: 'question_id'
      }
    },
    sqqo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
  }, {
    tableName: 'sq_question_option'
});

module.exports = sq_question_option;