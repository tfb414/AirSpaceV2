var express = require('express');
var router = express.Router();
const sequelize = require('../sequelize.js');
const host = require('../models/host.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
	// Comment out this line:
  //res.send('respond with a resource');
//   sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   }); 

  host.findAll().then(hosts => {
    console.log(hosts)
}).catch(err => console.error('Noooooo'));

  // And insert something like this instead:
  res.json([{
  	id: 1,
  	username: "samsepi0l"
  }, {
  	id: 2,
  	username: "D0loresH4ze"
  }]);
});

module.exports = router;
