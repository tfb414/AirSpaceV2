/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('host_guest', {
    host_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'host',
        key: 'host_id'
      }
    },
    guest_id: {
      type: DataTypes.STRING,
      allowNull: true,
      references: {
        model: 'guest',
        key: 'guest_id'
      }
    }
  }, {
    tableName: 'host_guest'
  });
};
