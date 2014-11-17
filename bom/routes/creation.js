var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var fs = require('fs');

module.exports = function (app) {
    /* Add new object to store */
    router.post('/', function(req, res, next) {
        var id = uuid.v4();
        var new_file_path = app.get("file-dir") + "/" + id;
          
        fs.writeFile(new_file_path, req.body, function (err) {
            if (!err) {
                res.status(201).json({'id': id});
            }
            else {
                return next(new Error(err))
            }
        });
    });
    return router;
};
