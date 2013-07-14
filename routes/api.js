var _ = require('lodash');

module.exports = function(app, drone) {

    app.get('/api/takeoff', function(req, res) {
        drone.takeoff();
    });

    app.get('/api/land', function(req, res) {
        drone.land();
    });

}
