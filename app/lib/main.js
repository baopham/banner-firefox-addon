'use strict';

/**
 * Enable dubug mode
 * This allow to console.log in a firefox default configuration
 */
require('sdk/preferences/service').set('extensions.sdk.console.logLevel', 'debug');

var simplePrefs = require('sdk/simple-prefs');
var data = require('sdk/self').data;
var { PageMod } = require('sdk/page-mod');

// Create a content script
var pageMod = PageMod({
    include: ['*'],
    contentScriptFile: [data.url('contentscript.js')],
    contentStyleFile: [data.url('contentstyle.css')],
    onAttach: function(worker) {
        worker.port.emit('bannerPref', simplePrefs.prefs.banner);
        worker.port.emit('domainsPref', stringToRegex(simplePrefs.prefs.domains));

        simplePrefs.on('banner', function(prefName) {
            worker.port.emit('bannerPref', simplePrefs.prefs.banner);
        });

        simplePrefs.on('domains', function(prefName) {
            var regex = stringToRegex(simplePrefs.prefs.domains);
            worker.port.emit('domainsPref', regex);
        });

        function stringToRegex(str) {
            return str.replace(/\*/g, "[^ ]*");
        }
    }
});
