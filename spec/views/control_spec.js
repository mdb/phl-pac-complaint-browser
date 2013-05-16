describe("app#ControlView", function () {
  var control;

  beforeEach(function () {
    $('body').append('<div id="controls"></div>');
    $('body').append('<script type="text/template" id="control-template"></script>');

    control = new app.ControlView();
  });

  afterEach(function () {
    $('#control-template').remove();
    $('#controls').remove();
  });

  it("exists", function () {
    expect(typeof app.ControlView).toEqual('function');
  });

  it("is a class that can be instantiated", function () {
    expect(control instanceof app.ControlView).toEqual(true);
  });

  // TODO
  describe(".el", function () {
    xit("houses the jQuery element into which the view is injected", function () {
      expect(control.el).toEqual($('#controls'));
    });
  });

  describe(".events", function () {
    it("binds form submission to a #submit method", function () {
      expect(control.events['submit form#control-form']).toEqual('submit');
    });

    it("binds clicks of the clear link to a #clear method", function () {
      expect(control.events['click a.clear']).toEqual('clear');
    });
  });

  describe("#render", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.render).toEqual('function');
    });
  });

  describe("#getValues", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.getValues).toEqual('function');
    });
  });

  describe("#getParams", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.getParams).toEqual('function');
    });
  });

  describe("#buildURL", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.buildURL).toEqual('function');
    });
  });

  describe("#submit", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.submit).toEqual('function');
    });
  });

  describe("#clear", function () {
    it("exists as a public method on a ControlView instance", function () {
      expect(typeof control.clear).toEqual('function');
    });
  });
});
