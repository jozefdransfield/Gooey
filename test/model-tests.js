var Gooey = require("../lib/gooey")

module.exports = {
    "Create Model":function (test) {
        var model = new Gooey.Model();
        test.done();
    },
    "Set and Get an attribute": function (test) {
        var model = new Gooey.Model();
	model.put("prop").set("value");
        test.same(model.get("prop").get(), "value");
        test.done();
    },
    "Listen to property change events": function(test) {
        var model = new Gooey.Model();
	model.put("prop").on("change", function() {
            test.done();
        });
        model.get("prop").set("value");
    }, 
    "Events bubble up to parent models": function(test) {
	var model = new Gooey.Model();
	model.on("change", function() {
            test.done();
        });
        model.put("prop").set("value");
    },
    "Event handler can cancel event bubbling": function(test) {
	var model = new Gooey.Model();
	model.on("change", function shouldNotBeCalledModelHandler() {
            throw "Should not be called"
        });
        model.put("prop").on("change", function propertyChangeHandlerInTest() {
            return false;
        });

        model.get("prop").set("value");
	test.done();
    }

}
