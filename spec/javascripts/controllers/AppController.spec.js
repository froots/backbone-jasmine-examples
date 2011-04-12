describe("AppController", function() {
  
  beforeEach(function() {
    this.controller = new AppController();
    this.collection = new Backbone.Collection();
    this.todo = new Backbone.Model();
    this.todosViewStub = sinon.stub(window, "TodosView")
      .returns(new Backbone.View());
    this.todosCollectionStub = sinon.stub(window, "Todos")
      .returns(this.collection);
    this.todoDetailViewStub = sinon.stub(window, "TodoDetailView")
      .returns(new Backbone.View());
    this.todoStub = sinon.stub(window, "Todo")
      .returns(this.todo);
    Backbone.history.start();
  });
  
  afterEach(function() {
    window.TodosView.restore();
    window.Todos.restore();
    window.TodoDetailView.restore();
    window.Todo.restore();
    window.location = "#null";
  })
  
  describe("Home route", function() {
    
    describe("when no Todo list exists", function() {
      
      beforeEach(function() {
        window.location = "#";
        Backbone.history.loadUrl();
      });
      
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
  
  describe("View todo route", function() {
    
    describe("when no detail view exists", function() {
      
      beforeEach(function() {
        window.location = "#todo/1";
        Backbone.history.loadUrl();
      });
      
      it("creates a detailed todo view", function() {
        expect(this.todoDetailViewStub).toHaveBeenCalledOnce();
        expect(this.todoDetailViewStub).toHaveBeenCalledWith({
          model: this.todo 
        });
      });
      
      it("creates a todo model", function() {
        expect(this.todoStub).toHaveBeenCalledOnce();
        expect(this.todoStub).toHaveBeenCalledWith({id:"1"});
      });
      
    });
    
  });
  
});