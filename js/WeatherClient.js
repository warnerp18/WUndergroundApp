(function(window, undefined) {
    "use strict";
    var WeatherView = Backbone.View.extend({})

    function WeatherClient(options) {
        this.options = _.extend({}, options, {
            keyid: "6b18e3006f0c1e2b"
        });

        this.init();
    }

    WeatherClient.prototype.queryAPI = function(state, city) {
        var url = [
            "http://api.wunderground.com/api/",
            this.options.keyid,
            "/forecast/geolookup/conditions/q/",
            "TX",
            "/",
            "Houston",
            ".json"
        ];
        return $.get(url.join('')).then(function() {
            console.log(url);
            console.log("hi");
            return arguments[0];
        })
    }

    WeatherClient.prototype.makeWeatherUndergroundRequest = function(data) {
        $.when(
            this.queryAPI("TX", "Houston")
        ).then(function() {
            arguments[0].locations.forEach(function(data) {
                new WeatherView(data);
            })
        })

    };

    WeatherClient.prototype.init = function() {
        // body...
        var self = this;

        $.when(
        this.queryAPI("TX", "Houston")
        ).then(function(TX, Houston) {
            self.makeWeatherUndergroundRequest(data);
        })

    };

    window.WeatherClient = WeatherClient;
})(window, undefined);
