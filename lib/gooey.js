var b_ = require("boneidle");
var util = require("../lib/Class");

var EventEmitter = Class.extend({
    init: function() {

    },
    listeners:[],
    on:function (event, listener) {
        var eventListener = {event:event, listener:listener};
        this.listeners.push(eventListener);
        return eventListener
    },
    emit:function (event, data) {
        for (i in this.listeners) {
            this.listeners[i].listener(data);
        }
    }
});

var Model = EventEmitter.extend({
    init:function () {
        this._super();
    },
    attributes:{},
    set: function(name, value) {
        this.attributes[name] = value;
        this.emit("change:"+name, {});
    },
    get: function (name) {
        return this.attributes[name];
    }
});

module.exports = {
    Model:Model
}