
describe('Subscription ', function() {
    it('Should fire when a subscribable property changes', function () {
        var Intern = ko.Model.extend({
                initialize: function () {
                    var self = this;

                    this.first_name = ko.observable();
                    this.last_name = ko.observable();
                    this.age = null;
                    this.name = ko.computed(function () {
                        return self.first_name() + " " + self.last_name();
                    });
                },
                subscriptionParameters: ['first_name']
            }),
            shelly = new Intern(),
            output = null;

        shelly.subscribe(function(value) {
            output = value;
        });

        runs(function() {
            shelly.set({first_name: 'Shelly'});
        });

        waitsFor(function() {
            return output !== null;
        });

        runs(function() {
            expect(output).toEqual({
                first_name: "Shelly"
            });

            shelly.destroy();
        });
    });
});