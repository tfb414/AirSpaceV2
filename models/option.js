module.exports = (sequelize, Sequelize) => {
    const option = sequelize.define('option', {
        option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        option: {
        type: Sequelize.TEXT,
        allowNull: true
        },
        option_value: {
        type: Sequelize.BOOLEAN,
        allowNull: true
        }
    }, {
        tableName: 'option'
    });
    return option;
}