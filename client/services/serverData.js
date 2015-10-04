module.exports = {
    get: function(key) {
        window._serverData = window._serverData || {};
        var value = window._serverData[key];
        delete window._serverData[key];
        return value;
    }
}
