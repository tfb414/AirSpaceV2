require('dotenv').config();
const Sequelize = require('sequelize');
const pg = require('pg');

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',

//   pool: {
//     max: 5,
//     min: 0,
//     idle: 10000
//   }
// });

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`);



// `postgres://${process.env.DB_HOST}/user:${process.env.DB_USER}:5432/${process.env.DB_NAME}`);

module.exports = sequelize;