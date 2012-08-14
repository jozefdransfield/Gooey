var Gooey = require("../lib/gooey")

module.exports = {
    "Create Model":function (test) {
        var model = new Gooey.Model();
        test.done();
    },
    "Set and Get an attribute": function (test) {
        var model = new Gooey.Model();
        model.set("att", "value");
        test.same(model.get("att"), "value");
        test.done();
    },
    "Listen to property change events": function(test) {
        var model = new Gooey.Model();
        model.on("change", function() {
            test.done();
        });
        model.set("att", "value")
    }

}