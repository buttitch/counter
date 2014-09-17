/**
 * Marcin - 18/09/2014
 */

if (Meteor.isClient) {
    Meteor.startup(function () {
        // render donut chart
        var donut = new EyePie({target: '#donut', data: [], colour: ["#f00", "#00f"]});

        // whenever counters change update donut
        Deps.autorun(function () {
            var local = Session.get("counter");
            var global = Counters.findOne({_id: 'global'});
            if (global) {
                // update donut chart showing local to global clicks
                donut.update([local, global.count - local]);
            }
        });
    });
}
