describe("AppController", function() {
  
  beforeEach(function() {
    this.controller = new AppController();
    this.collection = new Backbone.Collection();
    this.todosViewStub = sinon.stub(window, "TodosView")
      .returns(new Backbone.View());
    this.todosCollectionStub = sinon.stub(window, "Todos")
      .returns(this.collection);
    Backbone.history.start();
  });
  
  afterEach(function() {
    window.TodosView.restore();
    window.Todos.restore();
  })
  
  describe("Home route", function() {
    
    describe("when no Todo list exists", function() {
      
      it("creates a Todo list collection", function() {
        expect(this.todosCollectionStub).toHaveBeenCalledOnce();
        expect(this.todosCollectionStub).toHaveBeenCalledWithExactly();
      });
      
      it("creates a Todo list view", function() {
        expect(this.todosViewStub).toHaveBeenCalledOnce();
        expect(this.todosViewStub).toHaveBeenCalledWith({
          collection: this.collection
        });
      });
      
    });
    
  });
  
});