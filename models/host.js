/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('host', {
    host_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    first_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    last_name: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'host'
  });
};
