var React = require('react')
    , Main = require('./components/Main')
    , ReactRouter = require('react-router')
    , Router = ReactRouter.Router
    , Route = ReactRouter.Route
    , Link = ReactRouter.Link
    , routes = require('../common/routes')
    , createBrowserHistory = require('history/lib/createBrowserHistory');

var history = createBrowserHistory();
var mountNode = document.getElementById('react-app');
React.render((
    <Router routes={routes} history={history}>
    </Router>
), mountNode);
