describe("app#ComplaintsCollection", function () {
  it("exists", function () {
    expect(typeof app.ComplaintsCollection).toEqual('function');
  });

  it("is a class that can be instantiated", function () {
    var complaints = new app.ComplaintsCollection();
    expect(complaints instanceof app.ComplaintsCollection).toEqual(true);
  });
});
