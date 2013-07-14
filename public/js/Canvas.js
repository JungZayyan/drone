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
    
    app.Canvas.prototype.render = function (data) {
        var img = new Image(),
            imgUrl = data.png.indexOf('data:image/png;base64,') !== -1 ? data.png : 'data:image/png;base64,' + data.png,
            _this = this;
        
        //this.context.clearRect(0 , 0 , this.width , this.height);
        img.onload = function () {
            _this.context.drawImage(this, 0, 0, this.width, this.height);
            _this.renderRectangles(data.faces);
        }
        img.src = imgUrl;
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
        this.context.strokeStyle = '#FF0000';
        this.context.stroke();
        this.context.restore();
    }
})(window.app, jQuery);