var express = require('express');
var router = express.Router();
const queries = require('../queries.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    
    queries.getHostById('578')
        .then(host => {
            res.json(host);
        })
    queries.addGuest('3737', 'bestnum@37.org', 'say-rah', 'lou');

});

module.exports = router;

// .then(hosts => {
//         res.json(hosts.map(host => {
//             return host.dataValues
//         }))
