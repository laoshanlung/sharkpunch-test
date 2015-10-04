var React = require('react/addons')
    , NavBar = require('./NavBar')
    , GameForm = require('./GameForm')
    , gameService = require('../services/game')
    , _ = require('lodash');

var GameEdit = React.createClass({
    render: function() {
        var params = this.props.params || {};
        return (
            <div>
                <NavBar></NavBar>
                <div className="container">
                    <GameForm gameId={params.id}></GameForm>
                </div>
            </div>
        )
    }
});

module.exports = GameEdit;