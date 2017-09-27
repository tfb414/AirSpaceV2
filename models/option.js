/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('option', {
    option_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    option: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    option_value: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  }, {
    tableName: 'option'
  });
};
