var b_ = require("boneidle");
var util = require("../lib/Class");

var EventEmitter = Class.extend({
    init: function() {
	this.listeners = []
    },
    on:function (event, listener) {
        var eventListener = {event:event, listener:listener};
        this.listeners.unshift(eventListener);
        return eventListener
    },
    emit:function (event, data) {
        for (i in this.listeners) {
            if(this.listeners[i].listener(event, data) == false) {
		break;
	    }
        }
    }
});

var Model = EventEmitter.extend({
    init:function () {
        this._super();
	this.props = {};
    },
    put: function(name) {
	var self = this;
        this.props[name] = new Property();
	this.props[name].on("change", function propertyChange(event, data) {
	self.emit(event, data);
});
        return this.props[name];
    },
    get: function (name) {
        return this.props[name];
    }
});

var Property = EventEmitter.extend({
    init: function() {
         this._super();
    },
    set: function(value) {
	this.value = value;
	this.emit("change", {});
    },
    get: function(value) {
        return this.value;
    }
});

var View = Class.extend({
    init: function(el){
	this.el = el;
    },
    render: function(el) {
	return el;
    }
});

module.exports = {
    Model:Model
}
