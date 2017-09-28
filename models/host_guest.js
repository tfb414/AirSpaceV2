
module.exports = (sequelize, Sequelize) => {
    const host_guest = sequelize.define('host_guest', {
        host_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'host',
            key: 'host_id'
        }
        },
        guest_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'guest',
            key: 'guest_id'
        }
        },
        host_guest_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        }
    }, {
            tableName: 'host_guest'
    });
    return host_guest;
}
