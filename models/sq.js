
module.exports = (sequelize, Sequelize) => {
    const sq = sequelize.define('sq', {
        sq_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        sq_name: {
        type: Sequelize.TEXT,
        allowNull: true
    },
      host_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
              model: 'host',
              key: 'host_id'
          }
      }  
    }, {
        tableName: 'sq'
    });
    return sq;
}
