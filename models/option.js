module.exports = (sequelize, Sequelize) => {
    const option = sequelize.define('options', {
        option_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
        },
        option_text: {
        type: Sequelize.TEXT,
        allowNull: true
        },
        option_value: {
        type: Sequelize.BOOLEAN,
        allowNull: true
        }
    }, {
        tableName: 'options'
    });
    return option;
}