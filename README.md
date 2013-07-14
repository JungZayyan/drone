drone
=====

This is our [Ottawa Summer of Drones](http://ottawadrones.com/) 2013 project.
This is *very* quick-and-dirty, made in 6 hours.

To make it work:

```sh
$ git clone git@github.com:undashes/drone.git
$ cd drone
$ npm install
$ node app.js
```

There is a bunch of dependencies to install beforehand, depending on the
operating system, notably, the OpenCV headers and libraries.

Then you should be able to go on http://localhost:3000/ to access the app
and start the [AR.drone](http://ardrone2.parrot.com/)
(you must be connected to the drone Wifi access point).

The application is supposed to make the drone follow the detected heads
and take a photo when the heads are centered. This behavior, though, is
pretty alpha. Head-detection with OpenCV, though, is working.

Feel free to fork and play with it.
