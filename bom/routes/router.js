

module.exports = function (app) {
    routes = app.get("routes")
    for (var route in routes) {
        app.use(routes[route], require("./" + route)(app));
    }
}

