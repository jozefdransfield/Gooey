/*global QUnit:false, module:false, test:false, asyncTest:false, expect:false*/
/*global start:false, stop:false ok:false, equal:false, notEqual:false, deepEqual:false*/
/*global notDeepEqual:false, strictEqual:false, notStrictEqual:false, raises:false*/
(function ($) {

    /*
     ======== A Handy Little QUnit Reference ========
     http://docs.jquery.com/QUnit

     Test methods:
     expect(numAssertions)
     stop(increment)
     start(decrement)
     Test assertions:
     ok(value, [message])
     equal(actual, expected, [message])
     notEqual(actual, expected, [message])
     deepEqual(actual, expected, [message])
     notDeepEqual(actual, expected, [message])
     strictEqual(actual, expected, [message])
     notStrictEqual(actual, expected, [message])
     raises(block, [expected], [message])
     */


    var SimpleModel = function SimpleModel() {
        this.super_({
            propA:String,
            propB:Number
        })
    }

    Gooey.inherits(SimpleModel, Gooey.Model);


    module('Gooey#', {
        setup:function () {
            this.simpleModel = new SimpleModel();

            var a = new SimpleModel();
            a.on("change", function () {

            });

            var b = new SimpleModel()
            console.log(a, b);
        }
    });

    test('create model', 2, function () {
        ok(this.simpleModel.propA, 'propA should not throw an error or be null');
        ok(this.simpleModel.propB, 'propB should not throw an error or be null');
    });

    test('model types', 1, function () {
        ok(this.simpleModel instanceof Gooey.EventEmitter, 'should be a simple model');
    });

    test('properties have types', 2, function () {
        this.simpleModel.propA = "propA";
        this.simpleModel.propB = 6;

        ok(this.simpleModel.propA instanceof String, 'propA is a String');
        ok(this.simpleModel.propB instanceof Number, 'propB is a Number');
    });

    test('changing properties triggers change', 1, function () {
        this.simpleModel.propA.on("change", function () {
            ok('Change Event was called');
        });
        this.simpleModel.propA = "New Value";
    });

    test('changing a properties triggers a change on the model', 1, function () {
        this.simpleModel.on("change", function () {
            ok('Change Event was called');
        });
        this.simpleModel.propA = "New Value";
    });


}(jQuery));
