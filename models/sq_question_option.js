/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('sq_question_option', {
    sq_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'sq',
        key: 'sq_id'
      }
    },
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'option',
        key: 'option_id'
      },
      unique: true
    },
    question_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'question',
        key: 'question_id'
      }
    }
  }, {
    tableName: 'sq_question_option'
  });
};
