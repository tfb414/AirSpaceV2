const Sequelize = require('sequelize');
const sequelize = require('../sequelize.js');

const question = sequelize.define('question', {
    question: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    question_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    question_number: {
      type: Sequelize.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'question'
});

module.exports = question;
