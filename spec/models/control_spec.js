describe("app#Control", function () {
  it("exists", function () {
    expect(typeof app.Control).toEqual('function');
  });

  it("is a class that can be instantiated", function () {
    var control = new app.Control();
    expect(control instanceof app.Control).toEqual(true);
  });
});
