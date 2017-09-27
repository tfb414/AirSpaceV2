require('dotenv').config();
const Sequelize = require('sequelize');
const pg = require('pg');
// const host = require('./models/host.js');


const sequelize = new Sequelize(`postgres://${process.env.DB_USER}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`);

// Verifies connection to database
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    }); 


module.exports = sequelize;