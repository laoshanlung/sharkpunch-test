var React = require('react/addons')
    , _ = require('lodash')
    , allPlatforms = require('../../common/platforms');

var GameSummary = React.createClass({
    render: function() {
        var game = this.props.game;

        var gamePlatforms = (game.platforms || []).map(function(gamePlatform) {
            var platform = _.findWhere(allPlatforms, {
                id: gamePlatform
            });

            platform = platform || {
                id: 'unknown',
                label: 'Unknown'
            };

            return (
                <li key={platform.id}>{platform.label}</li>
            );
        }, this);

        return (
            <div className="game-summary">
                <h2>{game.name}</h2>
                <div>{game.description}</div>
                <div>Platforms</div>
                <ul>
                    {gamePlatforms}
                </ul>
            </div>
        )
    }
});

module.exports = GameSummary;