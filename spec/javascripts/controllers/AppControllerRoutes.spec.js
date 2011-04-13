var controller = new AppController();
Backbone.history.interval = 100;

describe("AppControllerRoutes", function() {
  
  beforeEach(function() {
    this.routeSpy = sinon.spy();
  });
  
  afterEach(function() {
    window.location.hash = "";
  });
  
  it("fires the index route with a blank hash", function() {
    controller.bind("route:index", this.routeSpy);
    window.location.hash = "";
    Backbone.history.start();
    expect(this.routeSpy).toHaveBeenCalled();
    expect(this.routeSpy).toHaveBeenCalledWith();
    controller.unbind("route:index");
  });
  
  it("fires the todo detail route", function() {
    controller.bind("route:todo", this.routeSpy);
    window.location.hash = "todo/1";
    Backbone.history.start();
    expect(this.routeSpy).toHaveBeenCalled();
    controller.unbind("route:todo");
  });

});