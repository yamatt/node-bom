var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var fs = require('fs');

var DEFAULT_DIR = "./files"

/* Add new object to store */
router.post('/', function(req, res, next) {
    var id = uuid.v4();
    var new_file_path = DEFAULT_DIR + "/" + id;
      
    fs.writeFile(new_file_path, req.body, function (err) {
        if (!err) {
            res.status(201).json({'id': id});
        }
        else {
            return next(new Error(err))
        }
    });
});

module.exports = router;
