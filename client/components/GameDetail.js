var React = require('react/addons')
    , NavBar = require('./NavBar')
    , GameSummary = require('./GameSummary')
    , _ = require('lodash')
    , Link = require('react-router').Link
    , gameService = require('../services/game');

var GameDetail = React.createClass({
    getInitialState: function() {
        return {
            game: {}
        };
    },

    componentWillMount: function() {
        if (this.props.game) {
            this.setState({
                game: this.props.game
            });
        }
    },

    componentDidMount: function() {
        if (this.props.game) {
            return;
        }

        gameService.get(this.props.params.id).done(function(game) {
            this.setState({
                game: game
            });
        }.bind(this));
    },

    render: function() {
        var game = this.state.game;
        var editUrl = '/edit/' + game.id;
        return (
            <div>
                <NavBar></NavBar>
                <div className="container">
                    <GameSummary game={game}></GameSummary>
                    <Link className="btn btn-primary" to={editUrl}>Edit</Link>
                </div>
            </div>
        )
    }
});

module.exports = GameDetail;