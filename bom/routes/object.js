var express = require('express');
var router = express.Router();
var fs = require('fs');

module.exports = function (app) {
    /* Add new object to store */
    router.get('/:id', function(req, res, next) {
        res.sendFile(req.params.id, {
            root: app.get("file-dir")
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
    return router;
}
