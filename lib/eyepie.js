// see: http://jsfiddle.net/Upcr5/2/
if (Meteor.isClient) {
    d3.edge = {};

    d3.edge.donut = function module(options) {
        options = options || {};
        var width = 300, // 460
            height = 300,
            radius = Math.min(width, height) / 2;

        var color = d3.scale.category20();
        if (options.colour) {
            color = d3.scale.ordinal().range(options.colour)
        }

        var dispatch = d3.dispatch("customHover");
        function graph(_selection) {
            _selection.each(function(_data) {
                var pie = d3.layout.pie()
                    .sort(null);

                var arc = d3.svg.arc()
                    .innerRadius(radius - 100) // 100
                    .outerRadius(radius - 20); // 50

                var svg = d3.select(this).select("svg > g");
                if (svg.empty()){
                    var svg = d3.select(this).append("svg")
                        .attr("width", width)
                        .attr("height", height)
                        .append("g")
                        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                }
                var path = svg.selectAll("path")
                    .data(pie);
                path
                    .enter().append("path")
                    .attr("fill", function(d, i) { return color(i); })
                    .attr("d", arc)
                    .each(function(d) {this._current = d;} );

                path.transition()
                    .ease("elastic")
                    .duration(750)
                    .attrTween("d", arcTween);

                path.exit().remove();

                function arcTween(a) {
                    var i = d3.interpolate(this._current, a);
                    this._current = i(0);
                    return function(t) {
                        return arc(i(t));
                    };
                }
            });

        }
        d3.rebind(graph, dispatch, "on");
        return graph;
    };

    EyePie = function EyePie(options) {
        options = options || {};
        this.donut = d3.edge.donut(options);
        var target = options.target || "#viz";
        var data = options.data || [];
        this.container = d3.select(target).datum(data).call(this.donut);
    };

    EyePie.prototype = {
        update: function (data) {
            this.container.datum(data).transition().ease("linear").call(this.donut);
        }
    };

    EyePie.prototype.constructor = EyePie;

}


