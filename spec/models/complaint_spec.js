describe("app#Complaint", function () {
  it("exists", function () {
    expect(typeof app.Complaint).toEqual('function');
  });

  it("is a class that can be instantiated", function () {
    var complaint = new app.Complaint();
    expect(complaint instanceof app.Complaint).toEqual(true);
  });
});
