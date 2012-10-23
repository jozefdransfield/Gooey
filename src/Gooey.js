/*
 * Gooey
 * https://github.com/jozefdransfield/Gooey
 *
 * Copyright (c) 2012 Jozef Dransfield
 * Licensed under the MIT license.
 */

(function () {
    var Gooey = {};

    Gooey.inherits = function (ctor, superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
            constructor:{
                value:ctor,
                enumerable:false,
                writable:true,
                configurable:true
            }
        });
    };

    Gooey.EventEmitter = function EventEmitter() {
        this.listeners = [];
        this.on = function (event, listener) {
            var eventListener = {event:event, listener:listener};
            this.listeners.unshift(eventListener);
            return eventListener
        }
        this.emit = function (event, data) {
            for (i in this.listeners) {
                if (this.listeners[i].listener(event, data) == false) {
                    break;
                }
            }
        }
    }

    Gooey.Model = function Model(meta) {
        this.super_();
        for (key in meta) {
            var prop = new meta[key];
            Property.apply(prop);
            Gooey.EventEmitter.apply(prop);
            addProperty(this, prop, key);
//            prop.on("change", function() {
//                this.emit("change", {});
//            });
        }
    }

    Gooey.inherits(Gooey.Model, Gooey.EventEmitter);

//    Gooey.inherits(Gooey.Model, Gooey.EventEmitter);

//    Gooey.EventEmitter = function () {
//        this.listeners = [];
//        this.on = function (event, listener) {
//            var eventListener = {event:event, listener:listener};
//            this.listeners.unshift(eventListener);
//            return eventListener
//        }
//        this.emit = function (event, data) {
//            for (i in this.listeners) {
//                if (this.listeners[i].listener(event, data) == false) {
//                    break;
//                }
//            }
//        }
//    };


//    Gooey.Model = function (meta) {
//        for (key in meta) {
//            var prop = new meta[key];
//            Property.apply(prop);
//            Gooey.EventEmitter.apply(prop);
//            addProperty(this, prop, key);
////            prop.on("change", function() {
////                this.emit("change", {});
////            });
//        }
//    }
//    Gooey.Model = _extends(Gooey.Model, Gooey.EventEmitter);

//    Gooey.Model.prototype = new Gooey.EventEmitter();

    function addProperty(obj, property, key) {
        Object.defineProperty(obj, key, {
            get:function () {
                return property;
            },
            set:function (val) {
                property.set(val);
            }});
    }

    Property = function () {
        this.valueOf = function () {
            return this.value;
        }
        this.toString = function () {
            return this.value;
        },
            this.set = function (val) {
                this.value = val;
                this.emit("change", {});
            }
    }

//    Gooey.View = Class.extend({
//        init:function () {
//            this.views = [];
//        },
//        addView:function (view) {
//            this.views.push(view);
//        },
//        renderTo:function (el) {
//            return el;
//        },
//        events:function (el) {
//
//        },
//        render:function () {
//            var el = this.renderTo(this.sel(document.documentElement));
//            this.events(el);
//
//            for (i in this.views) {
//                var child = this.views[i].sel(el);
//                this.views[i].renderTo(child);
//                this.views[i].events(child);
//            }
//        }
//    })
    window.Gooey = Gooey;
}).call(this)


