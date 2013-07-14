var cv = require('opencv'),
    util = require('util');

cv.readImage("./samples/sample-1373827559335.png", function(err, im){
    //im.convertGrayscale();
    new cv.CascadeClassifier('data/haarcascade_frontalface_alt.xml')
          .detectMultiScale(im, function(err, faces) {
        for (var i=0;i<faces.length; i++){
          var x = faces[i]
          im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
        }
        im.save('./out.png');
    });

  // im.detectObject(cv.FACE_CASCADE, {}, function(err, faces){
  //   for (var i=0;i<faces.length; i++){
  //     var x = faces[i]
  //     im.ellipse(x.x + x.width/2, x.y + x.height/2, x.width/2, x.height/2);
  //   }
  //   im.save('./out.jpg');
  // });
})
