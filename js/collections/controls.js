if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.ControlsCollection = Backbone.Collection.extend({
  model: app.Control
});
