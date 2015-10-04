var React = require('react/addons')
    , NavBar = require('./NavBar')
    , GameForm = require('./GameForm')
    , _ = require('lodash');

var GameCreate = React.createClass({
    render: function() {
        var game = {
            name: '',
            description: '',
            platforms: []
        };

        return (
            <div>
                <NavBar></NavBar>
                <div className="container">
                    <GameForm game={game}></GameForm>
                </div>
            </div>
        )
    }
});

module.exports = GameCreate;