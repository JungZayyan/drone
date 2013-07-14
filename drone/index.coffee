_               = require 'lodash'
arDrone         = require 'ar-drone'
{EventEmitter}  = require 'events'
opencv          = require 'opencv'

enable_opencv = true

classifier = new opencv.CascadeClassifier('data/haarcascade_frontalface_alt.xml')
speed = 0.05

class Drone extends EventEmitter
    constructor: (@log) ->
        @arClient  = arDrone.createClient()
        @pngStream = @arClient.getPngStream()
        processing = false
        @pngStream.on 'data', (data) =>
            return if processing
            processing = true
            @processMatrix data, (error, faces) =>
                processing = false
                if error
                    @log.error error
                    return
                @emit 'frame', data, faces
                @update faces

    processMatrix: (data, callback) ->
        return callback(null, {}) unless opencv? and enable_opencv
        opencv.readImage data, (error, im) ->
            return callback(new Error('error reading image:' + error.message)) if error
            classifier.detectMultiScale im, (err, faces) ->
                return callback(new Error('error processing image:' + error.message)) if error
                callback null, faces

    update: (faces) ->
        bigRect = {left:1000, top:1000, bottom:0, right:0}
        screen = {left:0, top:0, bottom:360, right:640}
        for face in faces
            bigRect.left = face.x if face.x < bigRect.left
            bigRect.top = face.y if face.y < bigRect.top
            right = face.x + face.width
            bigRect.right = right if right > bigRect.right
            bottom = face.y + face.height
            bigRect.bottom = bottom if bottom > bigRect.bottom
        xDelta = bigRect.left - (screen.right - bigRect.right)
        if Math.abs(xDelta) < 10
            client.right 0
        else
            if xDelta > 0
                client.right speed
            else
                client.left speed

    takeoff: ->
        @log.info 'taking off...'
        @arClient.disableEmergency()
        @arClient.stop()
        @arClient.takeoff =>
            @log.notice 'drone took off'
            @arClient.stop()

    land: ->
        @log.info 'landing...'
        @arClient.stop()
        @arClient.land =>
            @log.notice 'drone landed'

    calibrate: ->
        @arClient.stop()
        @arClient.calibrate(0)

module.exports = (log) ->
    new Drone(log)
