(function () {
  var helpers = {
    buildFilters: function (data) {
      var filterables = ['race', 'sex', 'type', 'unit', 'action', 'status'],
          filters = [],
          self = this;

      filterables.forEach(function (filter) {
        filters.push(self.buildFilterObj(filter, data));
      });

      return filters;
    },

    buildFilterObj: function (property, data) {
      return {
        trait: property,
        capitalizedTrait: this.capitalize(property),
        values: this.getUniqueValues(property, data)
      };
    },

    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },

    getUniqueValues: function (property, data) {
      var flags = [],
          output = [],
          propertyName = this.propertyName(property),
          value;

      data.forEach(function (item) {
        value = item[propertyName]['$t'];

        if (flags[value] || value === '') { return; }

        flags[value] = true;

        output.push(value);
      });

      return output;
    },

    propertyName: function (property) {
      return 'gsx$' + property;
    }
  };

  Polymer('phl-pac-complaints', {
    ready: function () {
      var self = this;

      self.$.sheet.addEventListener('google-sheet-data', function(e) {
        self.appliedFilters = {};
        self.complaints = this.rows;
        self.$.rows.model = this;
        self.$.filters.model = { filters: helpers.buildFilters(this.rows) };
      });
    },

    renderAll: function () {
      this.appliedFilters = {};
      this.$.rows.model.rows = this.complaints;
    },

    applyFilters: function (evt, detail, elem) {
      var property = helpers.propertyName(detail.item.getAttribute('trait'));

      this.appliedFilters[property] = detail.item.getAttribute('label');
      this.filterComplaints();
    },

    filterComplaints: function () {
      var filteredComplaints = this.complaints,
          self = this,
          trait;

      for (trait in this.appliedFilters) {
        if (self.appliedFilters[trait] === 'all') { continue; }

        filteredComplaints = filteredComplaints.filter(function (complaint) {
          return complaint[trait]['$t'] === self.appliedFilters[trait];
        });
      }

      this.$.rows.model.rows = filteredComplaints;
    },

    toggleDropdown: function (evt, detail, sender) {
      var trait = sender.getAttribute('trait');

      this.shadowRoot.querySelector('#collapse-' + trait).toggle();
    },

    toggleOverlay: function () {
      this.$.overlay.toggle();
      return false;
    }
  });
})();
