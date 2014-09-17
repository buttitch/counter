if (Meteor.isClient) {
    Meteor.startup(function () {
        var donut = new EyePie({target: '#donut', data: [100, 0], color: ["#f00", "#00f"]});

        Deps.autorun(function () {
            var local = Session.get("counter");
            var global = Counters.findOne({_id: 'global'});
            if (global) {
                donut.update([local, global.count]);
            }
        });
    });
}
