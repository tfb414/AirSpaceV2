module.exports = (sequelize, Sequelize) => {
    const guest_question_response = sequelize.define('guest_question_response', {
        gqr_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
        },
        guest_id: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: 'guest',
            key: 'guest_id'
        }
        },
        question_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'question',
            key: 'question_id'
        }
        },
        response: {
        type: Sequelize.TEXT,
        allowNull: true
        },
        option_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'option',
            key: 'option_id'
        }
    },
        response: {
        type: Sequelize.STRING,
        allowNull: true,
        }
    }, {
        tableName: 'guest_question_response'
    });
    return guest_question_response;
}