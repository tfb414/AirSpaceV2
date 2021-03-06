require('dotenv').config();
const Sequelize = require('sequelize');
const pg = require('pg');
// const host = require('./models/host.js');


const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

// Verifies connection to database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

// Connect all the models/tables in the database to a db object, so everything is acessible via // one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models/tables
db.host = require('./models/host.js')(sequelize, Sequelize);
db.guest = require('./models/guest.js')(sequelize, Sequelize);
db.guest_question_response = require('./models/guest_question_response.js')(sequelize, Sequelize);
db.host_guest = require('./models/host_guest.js')(sequelize, Sequelize);
db.option = require('./models/option.js')(sequelize, Sequelize);
db.question = require('./models/question.js')(sequelize, Sequelize);
db.sq = require('./models/sq.js')(sequelize, Sequelize);
db.sq_question_option = require('./models/sq_question_option.js')(sequelize, Sequelize);
db.scores = require('./models/scores.js')(sequelize, Sequelize);

//Syncs tables to DB 
// db.scores.sync({force: true});
// db.host.sync({force: true});
// db.guest.sync({force: true});
// db.guest_question_response.sync({force: true});
// db.host_guest.sync({force: true});
// db.option.sync({force: true});
// db.question.sync({force: true});
// db.sq.sync({force: true});
// db.sq_question_option.sync({force: true});

module.exports = db;
