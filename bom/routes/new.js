var express = require('express');
var router = express.Router();

/* Add new object to store */
router.post('/', function(req, res, next) {
  res.status(201).send('respond with a resource');
});

module.exports = router;
