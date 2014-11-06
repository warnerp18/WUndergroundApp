(function(window, undefined) {
        "use strict";
        var WeatherView = Backbone.View.extend({
                className: "weather",
                initialize: function(opts) {
                    // 1. Sometimes it will be instantiated without options, so to guard against errors:
                    this.options = _.extend({}, {
                            $container: $('body')
                        },
                        opts
                    );
                    // 2. Part of putting a view into its initial state is to put its element
                    //    into the DOM. Its container should be configurable using an option
                    //    so that a) it can be used anywhere in the app and b) it can be
                    //    easily unit tested.
                    this.options.$container.append(this.el);

                    // 3. Render the content of the view
                    this.render();
                },
                template: "<h1>{name}</h1><hr><ul><li>{location.lat}</li><li>{location.lng}</li></ul>",
                render: function() {
                    this.el.innerHTML = _.template(this.template, this.options);
                }
        })

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
        ).then(function(/*TX, Houston*/) {
            self.makeWeatherUndergroundRequest(data);
        })

    };

    window.WeatherClient = WeatherClient;
})(window, undefined);
