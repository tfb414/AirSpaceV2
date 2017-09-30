var express = require('express');
var router = express.Router();
const ensureAuthenticated = require('../utils').ensureAuthenticated;
var React = require('react');
// var HostDashboard = require('../client/src/components/HostDashboard.js');
// var markup = React.renderComponentToString(HostDashboard)
// const queries = require('../queries.js');

/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
    res.render('host')
    // queries.getHostById('578')
    //     .then(host => {
    //         res.json(host);
    //     })

    // queries.addOption('Vanilla Rick', 'TRUE');
    // queries.addSQQuestionOption(1, 1, 1);
    // queries.addHostGuest(578, 8585)
    // queries.addHostGuest(578, 3737)
    // queries.addHostGuest(578, 4949)

});

module.exports = router;

// .then(hosts => {
//         res.json(hosts.map(host => {
//             return host.dataValues
//         }))
