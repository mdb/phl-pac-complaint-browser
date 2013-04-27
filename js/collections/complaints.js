if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Complaints = Backbone.Collection.extend({
  model: app.Complaint
});
