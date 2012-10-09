(function () {
    var Gooey = {};
    Gooey.EventEmitter = Class.extend({
        init:function () {
            this.listeners = []
        },
        on:function (event, listener) {
            var eventListener = {event:event, listener:listener};
            this.listeners.unshift(eventListener);
            return eventListener
        },
        emit:function (event, data) {
            for (i in this.listeners) {
                if (this.listeners[i].listener(event, data) == false) {
                    break;
                }
            }
        }
    });


    Gooey.Model = Gooey.EventEmitter.extend({
        init:function () {
            this._super();
            for (key in this.meta) {
                var model = new Gooey.Property(this.meta[key]);
                Object.defineProperty(this, key, {
                    get:function () {
                        return model;
                    },
                    set:function (val) {
                        model.set(val);
                    }});
            }
        }
    });

    Gooey.Property = Gooey.EventEmitter.extend({
        init:function (type) {
            this._super();
        },
        valueOf:function () {
            return this.value;
        },
        toString:function () {
            return this.value;
        },
        set:function (val) {
            this.value = val;
            this.emit("change", {});
        }
    })


    Gooey.View = Class.extend({
        init:function () {
            this.views = [];
        },
        addView:function (view) {
            this.views.push(view);
        },
        renderTo:function (el) {
            return el;
        },
        events:function (el) {

        },
        render:function () {
            var el = this.renderTo(this.sel(document.documentElement));
            this.events(el);

            for (i in this.views) {
                var child = this.views[i].sel(el);
                this.views[i].renderTo(child);
                this.views[i].events(child);
            }
        }
    })
    window.Gooey = Gooey;
}).call(this)

