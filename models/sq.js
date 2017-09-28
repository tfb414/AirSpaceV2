
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
        }
    }, {
        tableName: 'sq'
    });
    return sq;
}
