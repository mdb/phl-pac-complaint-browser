describe("app#ControlsCollection", function () {
  it("exists", function () {
    expect(typeof app.ControlsCollection).toEqual('function');
  });

  it("is a class that can be instantiated", function () {
    var controls = new app.ControlsCollection();
    expect(controls instanceof app.ControlsCollection).toEqual(true);
  });
});
