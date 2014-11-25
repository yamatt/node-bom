var express = require('express');
var router = express.Router();
var uuid = require('uuid');
var fs = require('fs');
var url = require('url');

module.exports = function (app) {
    /* Add new object to store */
    router.post('/', function(req, res, next) {
        var rev = uuid.v4();
        
        var app_uri = req.get('BOM-APPLICATION-URI');
        // need to test for invalid URIs (ones with / in etc.)
        // need to check if a file for application already exists
        var uri = url.parse(app_uri);
        
        var file_id = url.resolve(uri.host + "/", rev);
        var id = url.format({
            protocol: "bom:",
            slashes: true,
            host: uri.host,
            pathname: rev
        });
        
        var file_directory = app.get("file-dir") + "/" + uri.host;
        var file_path = file_directory + "/" + rev;
        
        // will need to check if file does not already exist?
        fs.mkdir(file_directory, function (err) {
            if (err.code !== "EEXIST") {
                return next(new Error(err))
            }
            fs.writeFile(file_path, req.body, function (err) {
                if (!err) {
                    res.status(201).json({'id': id});
                }
                else {
                    return next(new Error(err))
                }
            });
        });
    });
    return router;
};
