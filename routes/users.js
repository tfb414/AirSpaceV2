var express = require('express');
var router = express.Router();
const queries = require('../queries.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

    queries.retrieveAllHosts().then(hosts => {
        res.json(hosts.map(host => {
            return host.dataValues
        }))
    });
  
});

module.exports = router;
