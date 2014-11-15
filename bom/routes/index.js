var express = require('express');
var router = express.Router();

/* List all Objects */
router.get('/', function(req, res, next) {
  res.status(200).send('respond with a resource');
});

module.exports = router;
