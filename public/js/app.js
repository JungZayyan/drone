/*
 * app will be the namesapce for the application
 */

(function (app, $) {
    /***********************
    ** Setup functions
    ***********************/
    function setupSocketEvents () {
        app.socket.on('png update', function (data) {

            //Assuming that we are getting base64 render that to the canvas
            app.streamCanvas.render(data.png);
        });
    }
    function setupUiListeners () {

    }

    /***********************
    ** Canvas class
    ***********************/
    function Canvas (canvasEl) {
        this.el = canvasEl;
        this.context = this.el.getContext('2d');
    }
    Canvas.prototype.render = function (imgData) {
        var img = new Image();
        
        console.log(imgData);
        img.onload = function () {
            this.context.drawImage(this, 0, 0, this.el.width, this.el.height);
        }
        img.src = imgData;
    }

    app.init = function () {
        var streamCanvas = document.getElementById('png-stream'),
        
        app.socket = io.connect('http://localhost');

        //Setup listeners for ui
        setupUiListeners();

        //Setup socket events
        setupSocketEvents();

        //Setup the canvas
        app.streamCanvas = new Canvas(streamCanvas);
    }

    $(document).ready(function () {

        //When the dom is loaded then initialize the app
        app.init();
    });
})(var app = app || {}, jQuery)