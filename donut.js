if (Meteor.isClient) {
    Meteor.startup(function () {
        var donut = new EyePie({target: '#donut', data: [], colour: ["#f00", "#00f"]});

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
