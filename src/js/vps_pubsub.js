  //pubsub events
  var pubsub = {
      _handlers: '',
      on: function(etype, handler) {
        if (typeof this._handlers !== 'object') {
          this._handlers = [];
        }
        if (!this._handlers[etype]) {
          this._handlers[etype] = []
        }
        if (typeof handler === 'function') {
          this._handlers[etype].push(handler)
        }
        return this;
      },
      emit: function(etype) {
        var args = Array.prototype.slice.call(arguments, 1)
        var handlers = this._handlers[etype] || [];
        for (var i = 0, l = handlers.length; i < l; i++) {
          handlers[i].apply(null, args)
        }
        return this;
      }
    }