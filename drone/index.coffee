_               = require 'lodash'
arDrone         = require 'ar-drone'
{EventEmitter}  = require 'events'
opencv          = require 'opencv'

class Drone extends EventEmitter
    constructor: (@log) ->
        @arClient  = arDrone.createClient()
        @pngStream = @arClient.getPngStream()
        @pngStream.on 'data', (data) =>
            @emit 'png', data

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
