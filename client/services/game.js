function put(url, params) {
    return $.ajax({
        type: 'put',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(params)
    });
}

function post(url, params) {
    return $.ajax({
        type: 'post',
        url: url,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(params)
    });
}

function get(url) {
    return $.ajax({
        type: 'get',
        url: url,
        dataType: 'json'
    });
}

var context = {
    games: []
};

var allPlatforms = require('../../common/platforms')
    , _ = require('lodash');

module.exports = {
    context: context,

    create: function(params) {
        return post('/api/games', params).then(function(res) {
            context.games.push(res);
            return res;
        });
    },

    update: function(params) {
        return put('/api/games/' + params.id, params).then(function(res) {
            var game = _.find(context.games, {
                id: res.id
            });

            if (game) {
                _.extend(game, res);
            }

            return res;
        });
    },

    list: function(params) {
        var url = '/api/games';

        var hasName = params.name;
        var hasPlatforms = params.platforms && params.platforms.length;

        if (params && (hasName || hasPlatforms)) {
            var filter = {
                where: {}
            };

            if (hasName) {
                filter.where['name'] = {
                    'like': params.name
                };
            }

            if (hasPlatforms) {
                filter.where['platforms'] = {
                    'inq': params.platforms
                }
            }
            url = url + '?filter=' + JSON.stringify(filter);
        }


        return get(url).then(function(res) {
            context.games.length = 0;
            context.games.push.apply(context.games, res);
            return context.games;
        });
    },

    get: function(id) {
        return get('/api/games/' + id).then(function(res) {
            return res;
        });
    },

    parsePlatformsFromState: function(state) {
        return _.chain(allPlatforms).filter(function(platform) {
            return state[platform.id];
        }, this).map(function(platform) {
            return platform.id;
        }, this).value();
    }
}