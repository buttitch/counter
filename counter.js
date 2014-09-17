/**
 * Marcin - 18/09/2014
 */

if (Meteor.isClient) {

    // local counter starts at 0
    Session.setDefault("counter", 0);

    Template.counter.helpers({
        localCount: function () {
            return Session.get("counter");
        },
        globalCount: function () {
            return Counters.findOne({ _id: 'global' }).count;
        }
    });

    Template.counter.events({
        'click .counter': function () {
            // increment the counters when div is clicked
            Session.set("counter", Session.get("counter") + 1);
            Counters.update({ _id: 'global' }, { $inc: { count: 1 } });
        }
    });

}
