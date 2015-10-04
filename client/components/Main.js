var React = require('react')
    , NavBar = require('./NavBar')
    , gameService = require('../services/game')
    , GameSummary = require('./GameSummary')
    , Link = require('react-router').Link
    , allPlatforms = require('../../common/platforms');

var Main = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    getInitialState: function() {
        return {
            games: []
        };
    },

    componentWillMount: function() {
        if (this.props.games) {
            this.setState({
                games: this.props.games
            });
        }
    },

    componentDidMount: function() {
        if (this.props.games) {
            return;
        }

        this.getGames();
    },

    getGames: function(filter) {
        filter = filter || {};

        return gameService.list(filter).then(function() {
            this.setState({
                games: gameService.context.games
            });
        }.bind(this));
    },

    filter: function(e) {
        var name = this.state.name;
        var platforms = gameService.parsePlatformsFromState(this.state);

        if (!name && platforms.length == 0) {
            return;
        }

        this.getGames({
            name: name,
            platforms: platforms
        });
    },

    render: function() {
        var games = this.state.games;

        games = games.map(function(game) {
            var editUrl = '/edit/' + game.id;
            var detailUrl = '/game/' + game.id;
            return (
                <div className="well">
                    <GameSummary game={game}></GameSummary>
                    <Link style={{marginRight: '10px'}} className="btn btn-primary" to={editUrl}>Edit</Link>
                    <Link className="btn btn-primary" to={detailUrl}>View</Link>
                </div>
            );
        });

        var platforms = allPlatforms.map(function(platform) {
            return (
                <div className="checkbox" key={platform.id}>
                    <label>
                        <input type="checkbox"
                               checkedLink={this.linkState(platform.id)}/> {platform.label}
                    </label>
                </div>
            );
        }, this);

        return (
            <div>
                {this.props.aaa}
                <NavBar></NavBar>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <input type="text"
                                   className="form-control"
                                   placeholder="Name"
                                   valueLink={this.linkState('name')}/>
                            {platforms}
                            <button className="btn btn-primary"
                                    onClick={this.filter}>Filter</button>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-md-8">
                            {games}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Main;