(function () {
  var helpers = {
    filterables: ['race', 'gender', 'type', 'unit', 'action', 'status'],

    buildFilters: function (data) {
      var filters = [],
          self = this;

      this.filterables.forEach(function (filter) {
        filters.push(self.buildFilterObj(filter, data));
      });

      return filters;
    },

    buildFilterObj: function (property, data) {
      return {
        trait: property,
        capitalizedTrait: this.capitalize(property),
        values: this.getUniqueValues(property, data),
        count: this.getCount(property, data)
      };
    },

    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },

    getCount: function (property, data) {
      var count = {},
          propertyName = this.propertyName(property),
          value;

      data.forEach(function (item) {
        value = item[propertyName]['$t'];

        if (value === '') { return; }

        if (count[value]) {
          count[value]++;
        } else {
          count[value] = 1;
        }
      });

      return count;
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
      var prop = property === 'gender' ? 'sex' : property;

      return 'gsx$' + prop;
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
      var self = this;

      this.appliedFilters = {};
      this.$.rows.model.rows = this.complaints;

      helpers.filterables.forEach(function (filter) {
        self.shadowRoot.querySelector('#' + filter + '-selector').selectIndex(0);
      });
    },

    applyFilters: function (evt, detail, elem) {
      var trait = detail.item.getAttribute('trait'),
          traitVal = detail.item.getAttribute('label'),
          property = helpers.propertyName(trait);

      this.appliedFilters[property] = traitVal;
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

    togglePanel: function (evt, detail, sender) {
      var trait = sender.getAttribute('trait'),
          panel = this.shadowRoot.querySelector('#collapse-' + trait);

      panel.toggle();
      panel.className = 'open';
      this.closeItemsExcept(trait);
    },

    closeItemsExcept: function (trait) {
      var items = helpers.filterables,
          self = this;

      items.forEach(function (item) {
        var panel = self.shadowRoot.querySelector('#collapse-' + item);

        if (item !== trait && panel.className === 'open') {
          panel.toggle();
          panel.className = '';
        }
      });
    },

    toggleOverlay: function () {
      this.$.overlay.toggle();
    }
  });
})();
