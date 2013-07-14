/*
 * app will be the namesapce for the application
 */
(function ($) {
    'use strict';
    window.app = {}

    /***********************
    ** Setup functions
    ***********************/
    function setupSocketEvents () {
        app.socket.on('png-update', function (data) {

            //Assuming that we are getting base64 render that to the canvas
            app.streamCanvas.render(data.png);
            //app.streamCanvas.renderRectangles(data.rectangles);
        });
    }
    function setupUiListeners () {
        $('body')
            .on('click', 'button#still', function () {
                var img = app.streamCanvas.getImg();
                app.pngStill.render(img);
            })
            .on('click', 'button#power', function () {
                app.socket.emit('power', {});
            })
            .on('click', 'button#stabilize', function () {
                app.socekt.emit('stabilize', {});
            })
            .on('click', 'button.direction', function () {
                var dir = $(this).attr('id');

                app.socket.emit('direction', {direction: dir})
            });
    }

    app.init = function () {
        var streamCanvas = document.getElementById('png-stream'),
            pngStill = document.getElementById('png-still');
        
        app.socket = io.connect('http://localhost');

        //Setup listeners for ui
        setupUiListeners();

        //Setup socket events
        setupSocketEvents();

        //Setup the canvas
        app.streamCanvas = new app.Canvas(streamCanvas);
        app.pngStill = new app.Canvas(pngStill);
    }

    $(document).ready(function () {

        //When the dom is loaded then initialize the app
        app.init();
    });
})(jQuery)