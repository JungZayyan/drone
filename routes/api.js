var _ = require('lodash');

module.exports = function(app, arClient, log) {

    app.get('/api/takeoff', function(req, res) {
        log.info('taking off...');
        arClient.takeoff(function() {
            log.notice('drone took off');
        });
    });

    app.get('/api/land', function(req, res) {
        log.info('landing...');
        arClient.land(function() {
            log.notice('drone landed');
        });
    });

}
