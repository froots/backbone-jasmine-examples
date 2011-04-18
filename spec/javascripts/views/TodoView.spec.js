describe("TodoView", function() {
  
  beforeEach(function() {
    this.model = new Backbone.Model({
      id: 1,
      title: "My Todo",
      priority: 2,
      done: false
    });
    this.view = new TodoView({model:this.model});
  });
  
  it("loads the Todo template", function() {
    expect(this.templates.todo).toBeDefined();
  });
  
  describe("Root element", function() {
    
    it("is a LI", function() {
      expect(this.view.el.nodeName).toEqual("LI");
    });
    
  });
  
  describe("Rendering", function() {
    
    it("returns the view object", function() {
      expect(this.view.render()).toEqual(this.view);
    });
    
    it("produces the correct HTML", function() {
      this.view.render();
      expect(this.view.el.innerHTML).toEqual('<a href="#todo/1"><h2>My Todo</h2></a>');
    });
    
  });
  
});