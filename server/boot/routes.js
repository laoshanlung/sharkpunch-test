module.exports = function(app) {
    var Game = app.models.Game;
    var React = require('react');
    var routes = require('../../common/routes');
    var _ = require('lodash');
    var router = app.loopback.Router();

    function renderReact(Component, props) {
        Component = React.createFactory(Component);
        return React.renderToString(Component(props));
    }

    var beforeRender = {
        '/': function(req, cb) {
            Game.find({
                limit: 20
            }, function(error, games) {
                cb(error, {
                    'games': games
                });
            });
        },
        '/game/:id': function(req, cb) {
            var id = req.params.id;
            Game.findOne(function(error, game) {
                if (!game) {
                    return cb('Not found');
                }

                cb(error, {
                    'game': game
                });
            });
        }
    }

    _.each(routes, function(route) {
        router.get(route.path, function(req, res, next) {
            if (beforeRender[route.path]) {
                beforeRender[route.path](req, function(error, params) {
                    if (error) {
                        return res.send(new Error(error));
                    }
                    res.locals.content = renderReact(route.component, params);
                    res.locals.serverData = params;
                    res.render('main.html');
                });
            } else {
                res.locals.content = renderReact(route.component);
                res.render('main.html');
            }
        });
    });

    app.use(router);
};
