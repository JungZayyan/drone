# # Utility Library
#
# This library is useful for the project dev. and build scripts and provide
# the following features.
'use strict'
fs          = require 'fs'
colors      = require 'colors'
util        = require 'util'

# ## CLI Simple Log
#
# Very simple CLI logging class for the command-line tools. Outputting actual
# data shouldn't be done with the log, but on `stdout` instead. Log messages
# are always sent on `stderr`. The log enable color only is a TTY by default
# (user terminal). The application name is displayed only if the app. is called
# from another app. and not the user (that is, not in a TTY).
class exports.Log
    # Create the log, specifing the `appName`.
    constructor: (@appName) ->
        @isTTY = process.stderr.isTTY
        @haveColor = @isTTY
        @isVerbose = false

    # Enable or not verbose messages (info and debug).
    verbose: (value) ->
        return @isVerbose unless value?
        @isVerbose = value

    # Enable or not color, overriding the TTY status. It is generally useful
    # to provide a `--color` options in the scripts, forcing color on.
    color: (value) ->
        return @haveColor unless value?
        @haveColor = value

    # Generalization of a message.
    any: (message, level, color) ->
        process.stderr.write "#{@appName}: " unless @isTTY
        if level
            if color and @haveColor
                process.stderr.write "#{level[color]}: "
            else
                process.stderr.write "#{level}: "
        process.stderr.write "#{message}\n"

    # Output a fatal error and exit if `errorCode` is specified.
    fatal: (message, errorCode) ->
        @any message, 'fatal error', 'red'
        process.exit errorCode if errorCode?

    # Output an error.
    error: (message) ->
        @any util.format.apply(null, arguments), 'error', 'red'

    # Output a warning.
    warning: (message) ->
        @any util.format.apply(null, arguments), 'warning', 'yellow'

    # Output a notice.
    notice: (message) ->
        @any util.format.apply(null, arguments), 'notice', 'green'

    # Output a simple info.
    info: ->
        return unless @isVerbose
        @any util.format.apply(null, arguments)

    # Output debug info.
    debug: (message) ->
        return unless @isVerbose
        @any util.format.apply(null, arguments), 'debug', 'magenta'
