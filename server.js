/**
 * Module dependencies.
 */

function startServer() {
    var express = require('express'),
        http = require('http'),
        path = require('path'),
        app = express(),
        methodOverride = require('method-override'),
        request = require('request'),
        _ = require('lodash');

    function querify(queryParamsObject){
        return '?'+_.map(queryParamsObject || {}, function(val, key){
            return key+'='+val
        }).join('&');
    }

    // adds a new rule to proxy a localUrl -> webUrl
    // i.e. proxify ('/my/server/google', 'http://google.com/')
    function proxify(localUrl, webUrl){
        app.get(localUrl, function(req, res) {
            var url = [
                webUrl,
                querify(req.query)
            ].join("");

            console.log(req.query);
            console.log(url);

            req.pipe(request(url)).pipe(res);
        });
    }

    // add your proxies here
    proxify('/wunderground/api', 'http://api.wunderground.com/api/6b18e3006f0c1e2b/forecast/geolookup/conditions/q/TX/Houston.json');
    //proxify('/yummly/recipes', 'http://api.yummly.com/v1/api/recipes');
    //proxify('/brewery/styles', 'https://api.brewerydb.com/v2/styles');

    // all environments
    app.set('port', process.argv[3] || process.env.PORT || 3000);
    app.use(methodOverride());
    app.use(express.static(path.join(__dirname, '')));

    http.createServer(app).listen(app.get('port'), function() {
        console.log('Express server listening on port ' + app.get('port'));
    });
}

module.exports.startServer = startServer;