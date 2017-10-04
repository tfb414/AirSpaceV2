module.exports = (sequelize, Sequelize) => {
    const guest = sequelize.define('guest', {
        guest_id: {
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
            tableName: 'guest'
    });
    return guest;
}