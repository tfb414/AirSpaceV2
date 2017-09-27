require('dotenv').config();
const Sequelize = require('sequelize');
const pg = require('pg');


const sequelize = new Sequelize(`postgres://${process.env.DB_USER}@${process.env.DB_HOST}:5432/${process.env.DB_NAME}`);

module.exports = sequelize;