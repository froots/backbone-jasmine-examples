describe("AppController", function() {
    
  beforeEach(function() {
    this.controller = new AppController();
    this.collection = new Backbone.Collection();
    this.fetchStub = sinon.stub(this.collection, "fetch")
      .returns(null);
    this.todo = new Backbone.Model();
    this.todoListViewStub = sinon.stub(window, "TodoListView")
      .returns(new Backbone.View());
    this.todosCollectionStub = sinon.stub(window, "Todos")
      .returns(this.collection);
    this.todoDetailViewStub = sinon.stub(window, "TodoDetailView")
      .returns(new Backbone.View());
    this.todoStub = sinon.stub(window, "Todo")
      .returns(this.todo);
  });
  
  afterEach(function() {
    window.TodoListView.restore();
    window.Todos.restore();
    window.TodoDetailView.restore();
    window.Todo.restore();
  });
  
  describe("Index handler", function() {
    
    describe("when no Todo list exists", function() {
      
      beforeEach(function() {
        this.controller.index();
      });
      
      it("creates a Todo list collection", function() {
        expect(this.todosCollectionStub).toHaveBeenCalledOnce();
        expect(this.todosCollectionStub).toHaveBeenCalledWithExactly();
      });
      
      it("creates a Todo list view", function() {
        expect(this.todoListViewStub).toHaveBeenCalledOnce();
        expect(this.todoListViewStub).toHaveBeenCalledWith({
          collection: this.collection
        });
      });
      
      it("fetches the Todo list from the server", function() {
        expect(this.fetchStub).toHaveBeenCalledOnce();
        expect(this.fetchStub).toHaveBeenCalledWith();
      });
      
    });
    
  });
  
  describe("Todo detail handler", function() {
    
    describe("when no detail view exists", function() {
      
      beforeEach(function() {
        this.controller.todo("1");
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