if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.ComplaintsCollection = Backbone.Collection.extend({
  model: app.Complaint
});
