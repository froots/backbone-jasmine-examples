describe("AppRouter routes", function() {
  
  beforeEach(function() {
    this.router = new AppRouter;
    this.routeSpy = sinon.spy();
    try {
      Backbone.history.start({silent:true});
    } catch(e) {}
  });
  
  it("fires the todo detail route", function() {
    this.router.bind('route:todo', this.routeSpy);
    this.router.navigate("todo/1", true);
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith("1");
  });
  
  it("fires the index route with a blank hash", function() {
    this.router.bind("route:index", this.routeSpy);
    this.router.navigate("", true);
    expect(this.routeSpy).toHaveBeenCalledOnce();
    expect(this.routeSpy).toHaveBeenCalledWith();
  });
  

});