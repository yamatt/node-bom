var express = require('express');
var router = express.Router();
var fs = require('fs');

var DEFAULT_DIR = __dirname + "/../../files"

/* Add new object to store */
router.get('/:id', function(req, res, next) {
    console.log(DEFAULT_DIR);
    res.sendFile(req.params.id, {
        root: DEFAULT_DIR
    });
});

/* get meta data about object */
router.head('/:id', function(req, res) {
  
});

/* update specified object and return updated id */
router.put('/:id', function(req, res) {
  
});

/* remove specified object */
router.delete('/:id', function(req, res) {
  
});

module.exports = router;
