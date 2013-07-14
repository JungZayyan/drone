/*
 * app will be the namesapce for the application
 */

(function (app, $) {
    'use strict';

    /***********************
    ** Setup functions
    ***********************/
    function setupSocketEvents () {
        app.socket.on('png update', function (data) {

            //Assuming that we are getting base64 render that to the canvas
            app.streamCanvas.render(data.png);
            app.streamCanvas.renderRectangles(data.rectangles);
        });
    }
    function setupUiListeners () {

    }

    app.init = function () {
        var streamCanvas = document.getElementById('png-stream'),
        
        app.socket = io.connect('http://localhost');

        //Setup listeners for ui
        setupUiListeners();

        //Setup socket events
        setupSocketEvents();

        //Setup the canvas
        app.streamCanvas = new app.Canvas(streamCanvas);
    }

    $(document).ready(function () {

        //When the dom is loaded then initialize the app
        app.init();
    });
})(var app = app || {}, jQuery)