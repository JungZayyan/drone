var _ = require('lodash');

module.exports = function(app) {

    app.get('/', function(req, res) {
        res.render('index', { title: 'Drone control' });
    });

}

