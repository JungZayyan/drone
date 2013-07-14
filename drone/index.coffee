_               = require 'lodash'
arDrone         = require 'ar-drone'
{EventEmitter}  = require 'events'
opencv          = require 'opencv'

class Drone extends EventEmitter
    constructor: (@log) ->
        @arClient  = arDrone.createClient()
        @pngStream = @arClient.getPngStream()
        @pngStream.on 'data', (data) =>
            opencv.readImage data, (error, mat) =>
                return @log.error 'error reading image' if error
                @processMatrix mat, (error, faces) ->
                    @emit 'frame', data, faces

    processMatrix: (mat, callback) ->
        mat.detectObject opencv.FACE_CASCADE, {}, (error, faces) =>
            return callback @lor.error 'error processing matrix' if error
            callback null, faces

    takeoff: ->
        @log.info 'taking off...'
        @arClient.takeoff ->
            @log.notice 'drone took off'
            @arClient.stop()

    land: ->
        @log.info 'landing...'
        @arClient.stop()
        @arClient.land ->
            @log.notice 'drone landed'


module.exports = (log) ->
    new Drone(log)
