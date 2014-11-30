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
        filter: this.propertyName(property),
        values: this.getUniqueValues(property, data),
        count: this.getCount(property, data)
      };
    },

    getCount: function (property, data) {
      var count = {},
        propertyName = this.propertyName(property),
        value;

      data.forEach(function (item) {
        value = item[propertyName]['$t'];

        if (value === '') {
          return;
        }

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

        if (flags[value] || value === '') {
          return;
        }

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
    publish: {
      rows: [],
      applied: {
        gsx$action: 'all',
        gsx$race: 'all',
        gsx$sex: 'all',
        gsx$status: 'all',
        gsx$type: 'all',
        gsx$unit: 'all'
      },
      filteredData: []
    },

    observe: {
      'applied.gsx$action': 'appliedChanged',
      'applied.gsx$race': 'appliedChanged',
      'applied.gsx$sex': 'appliedChanged',
      'applied.gsx$status': 'appliedChanged',
      'applied.gsx$type': 'appliedChanged',
      'applied.gsx$unit': 'appliedChanged'
    },

    rowsChanged: function () {
      if (!this.loaded) {
        this.shadowRoot.querySelector('paper-spinner').removeAttribute('active');
        this.shadowRoot.querySelector('paper-spinner.map').removeAttribute('active');
      }

      this.filters = { filters: helpers.buildFilters(this.rows) };
      this.filteredData = this.rows;
      this.loaded = true;
    },

    renderAll: function () {
      this.applied = {
        gsx$action: 'all',
        gsx$race: 'all',
        gsx$sex: 'all',
        gsx$status: 'all',
        gsx$type: 'all',
        gsx$unit: 'all'
      };
    },

    appliedChanged: function () {
      var trait,
          filter,
          filteredData = this.rows;

      for (trait in this.applied) {
        if (this.applied[trait] === 'all') {
          continue;
        }

        filter = this.applied[trait];

        filteredData = filteredData.filter(function (complaint) {
          return complaint[trait]['$t'] === filter;
        });
      }

      this.filteredData = filteredData;
    },

    togglePanel: function (evt, detail, sender) {
      var trait = sender.getAttribute('trait'),
          panel = this.shadowRoot.querySelector('#collapse-' + trait),
          heading = this.shadowRoot.querySelector('#heading-' + trait);

      if (sender.getAttribute('class') === 'open') {
        sender.removeAttribute('class');
      } else {
        sender.setAttribute('class', 'open');
      }

      panel.toggle();
      this.closeItemsExcept(trait);
    },

    closeItemsExcept: function (trait) {
      var items = helpers.filterables,
        self = this;

      items.forEach(function (item) {
        var panel = self.shadowRoot.querySelector('#collapse-' + item);

        if (item !== trait && panel.className !== 'core-collapse-closed') {
          panel.previousElementSibling.removeAttribute('class');
          panel.toggle();
        }
      });
    },

    toggleOverlay: function () {
      this.$.overlay.toggle();
    },

    toTitleCase: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  });
})();
