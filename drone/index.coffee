_               = require 'lodash'
arDrone         = require 'ar-drone'
{EventEmitter}  = require 'events'
opencv          = require 'opencv'

class Drone extends EventEmitter
    constructor: (@log) ->
        @arClient  = arDrone.createClient()
        @pngStream = @arClient.getPngStream()
        @pngStream.on 'data', (data) =>
            @processMatrix data, (error, faces) =>
                @emit 'frame', data, faces

    processMatrix: (data, callback) ->
        return callback(null, {})
        opencv.readImage data, (error, mat) =>
            if error
                @log.error 'error reading image'
                return callback(null , {})
            mat.detectObject opencv.FACE_CASCADE, {}, (error, faces) =>
                if error
                    @log.error 'error processing matrix'
                    return callback(null , {})
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
