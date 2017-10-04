

module.exports = (sequelize, Sequelize) => {
    const host = sequelize.define('host', {
        host_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
        },
        first_name: {
        type: Sequelize.TEXT,
        allowNull: true
        },
        last_name: {
        type: Sequelize.TEXT,
        allowNull: true
        }
    }, {
        tableName: 'host'
    });
    return host;
}