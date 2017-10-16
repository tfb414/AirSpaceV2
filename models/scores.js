module.exports = (sequelize, Sequelize) => {
    const scores = sequelize.define('scores', {
    score_id: {
    type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    sq_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
            model: 'sq',
            key: 'sq_id'
        }
    },
      guest_id: {
          type: Sequelize.STRING,
          allowNull: false,
          references: {
              model: 'guest',
              key: 'guest_id'
          }
      },
       score: {
        type: Sequelize.INTEGER,
        allowNull: false
        }  
    }, {
        tableName: 'scores'
    });
    return scores;
}