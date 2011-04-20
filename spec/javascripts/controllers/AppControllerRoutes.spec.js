controller = new AppController();

describe("AppControllerRoutes", function() {
  
  beforeEach(function() {
    this.controller = controller;
    this.routeSpy = sinon.spy();
  });
  
  afterEach(function() {
    window.location.hash = "";
  });
  
  it("fires the index route with a blank hash", function() {
    this.controller.bind("route:index", this.routeSpy);
    window.location.hash = "";
    Backbone.history.start();
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith();
  });
  
  it("fires the todo detail route", function() {
    this.controller.bind("route:todo", this.routeSpy);
    window.location.hash = "todo/1";
    Backbone.history.start();
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith("1");
  });

});