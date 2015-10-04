var React = require('react/addons')
    , gameService = require('../services/game')
    , _ = require('lodash')
    , allPlatforms = require('../../common/platforms');

var GameForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],

    componentDidMount: function() {
        var gameId = this.props.gameId;
        if (gameId) {
            this.loadGame(gameId);
        }
    },

    loadGame: function(gameId) {
        gameService.get(gameId).done(this.setupState.bind(this));
    },

    setupState: function(game) {
        var state = {};
        state.name = game.name;
        state.description = game.description;

        _.each(game.platforms, function(platform) {
            state[platform] = true;
        });

        state.loading = false;
        this.setState(state);
    },

    getInitialState: function() {
        return {
            loading: this.props.gameId ? true : false,
            game: {}
        };
    },

    isDisabled: function() {
        return this.state.loading || !this.isValid();
    },

    isValid: function() {
        return this.getPlatforms().length > 0
                && this.state.name;
    },

    getPlatforms: function() {
        return gameService.parsePlatformsFromState(this.state);
    },

    clearInput: function() {
        var state = this.state;
        _.chain(allPlatforms).map(function(platform) {
            return platform.id;
        }).union(['name', 'description']).each(function(key) {
            state[key] = '';
        }, this);

        this.setState(state);
    },

    submit: function(e) {
        var self = this
            , gameId = this.props.gameId
            , promise;

        this.setState({loading: true});
        var game = {
            name: this.state.name,
            description: this.state.description,
            platforms: this.getPlatforms()
        };

        if (!gameId) {
            promise = gameService.create(game);
        } else {
            game.id = gameId;
            promise = gameService.update(game);
        }

        promise.done(function() {
            if (!gameId) {
                self.clearInput();
            }
        }).always(function() {
            self.setState({loading: false});
        });

        e.preventDefault();
    },

    render: function() {
        var platforms = allPlatforms.map(function(platform) {
            return (
                <div className="checkbox" key={platform.id}>
                    <label>
                        <input type="checkbox"
                               disabled={this.state.loading}
                               checkedLink={this.linkState(platform.id)}/>
                               {platform.label}
                    </label>
                </div>
            );
        }, this);

        var buttonText = this.props.gameId ? 'Update' : 'Create';

        return (
            <form onSubmit={this.submit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                           className="form-control"
                           id="name"
                           placeholder="Name"
                           disabled={this.state.loading}
                           valueLink={this.linkState('name')}/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description"
                              className="form-control"
                              placeholder="Description"
                              disabled={this.state.loading}
                              valueLink={this.linkState('description')}></textarea>
                </div>
                {platforms}
                <button type="submit"
                        disabled={this.isDisabled()}
                        className="btn btn-primary">
                    {buttonText}
                </button>
            </form>
        )
    }
});

module.exports = GameForm;