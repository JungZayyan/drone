(function (app, $) {
    'use strict';
    
    /***********************
    ** Canvas class
    ***********************/
    app.Canvas = function (canvasEl) {
        this.el = canvasEl;
        this.context = this.el.getContext('2d');
    }
    
    app.Canvas.prototype.render = function (imgData) {
        var img = new Image();
        
        console.log(imgData);
        img.onload = function () {
            this.context.drawImage(this, 0, 0, this.el.width, this.el.height);
        }
        img.src = imgData;
    }
    app.Canvas.prototype.renderRectangles = function (rectangles) {

        //Expects an array of rectangles
    }

    //'private' methods
    function renderRectangle () {
        
    }
})(var app = app || {}, jQuery);