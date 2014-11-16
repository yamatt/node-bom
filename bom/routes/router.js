routes = {
    "meta": "/",
    "creation": "/",
    "object": "/",
}

module.exports = function (app) {
    for (var route in routes) {
        app.use(routes[route], require("./" + route));
    }
}

