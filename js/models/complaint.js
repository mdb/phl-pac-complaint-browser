if (typeof app === 'undefined' || !app) {
  var app = {};
}

app.Complaint = Backbone.Model.extend({
  getStatus: function () {
    return this.get('status');
  },

  getRace: function () {
    return this.get('race');
  },

  getSex: function () {
    return this.get('sex');
  },

  getType: function () {
    return this.get('type');
  },

  getAge: function () {
    return this.get('age');
  },

  getUnit: function () {
    return this.get('unit');
  },

  getDate: function () {
    return this.get('date');
  },

  getAction: function () {
    return this.get('action');
  },
});
