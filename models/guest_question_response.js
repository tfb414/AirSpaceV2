/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('guest_question_response', {
    guest_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'guest',
        key: 'guest_id'
      }
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'question',
        key: 'question_id'
      }
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'option',
        key: 'option_id'
      }
    }
  }, {
    tableName: 'guest_question_response'
  });
};
