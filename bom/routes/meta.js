var express = require('express');
var router = express.Router();



module.exports = function (app) {
  /* List all Objects */
  router.get('/', function(req, res) {
    res.status(200).send('respond with a resource');
  });
  
  return router;
};
