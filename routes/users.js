var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize.js');
const host = require('../models/host.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

    host.findAll().then(hosts => {
        let response = hosts.map(host => {
            return host.dataValues
        })
        res.json(response);
    });
  
});

module.exports = router;
