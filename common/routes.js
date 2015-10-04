module.exports = [
    {
        path: '/',
        component: require('../client/components/Main')
    },
    {
        path: '/create',
        component: require('../client/components/GameCreate')
    },
    {
        path: '/edit/:id',
        component: require('../client/components/GameEdit')
    },
    {
        path: '/game/:id',
        component: require('../client/components/GameDetail')
    }
];
