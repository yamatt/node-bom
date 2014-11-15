routes = {
    "index": "/",
    "new": "/"
}

module.exports = function (app) {
    for (var route in routes) {
        app.use(routes[route], require("./" + route));
    }
}

