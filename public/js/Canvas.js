(function (app, $) {
    'use strict';
    
    /***********************
    ** Canvas class
    ***********************/
    app.Canvas = function (canvasEl) {
        this.el = canvasEl;
        this.context = this.el.getContext('2d');
        this.width = $(canvasEl).attr('width');
        this.height = $(canvasEl).attr('height');
    }
    
    app.Canvas.prototype.render = function (imgData) {
        var img = new Image(),
            imgUrl = imgData.indexOf('data:image/png;base64,') !== -1 ? imgData : 'data:image/png;base64,' + imgData,
            _this = this;
        
        img.onload = function () {
            _this.context.drawImage(this, 0, 0, this.width, this.height);
        }
    }
    app.Canvas.prototype.renderRectangles = function (rectangles) {

        //Expects an array of rectangles
        _.forEach(rectangles, renderRectangle, this);
    }
    app.Canvas.prototype.getImg = function () {
        var img = this.el.toDataURL('png');

        app.socket.emit('png-saved', {png: img.replace('data:image/png;base64,', '')});
        return img;
    }

    //'private' methods
    function renderRectangle (rect) {
        this.context.save();
        this.context.rect(rect.x, rect.y, rect.width, rect.height);
        this.context.lineWidth = 3;
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.reset();
    }
})(window.app, jQuery);