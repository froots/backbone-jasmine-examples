describe("TodoListView", function() {
  
  beforeEach(function() {
    this.view = new TodoListView();
  });
  
  describe("Instantiation", function() {
    
    it("should create a list element", function() {
      expect(this.view.el.nodeName).toEqual("UL");
    });
    
    it("should have a class of 'todos'", function() {
      expect($(this.view.el)).toHaveClass('todos');
    });
    
  });
  
  describe("Rendering", function() {
    
    beforeEach(function() {
      this.todoView = new Backbone.View();
      this.todoView.render = function() {
        this.el = document.createElement('li');
        return this;
      };
      this.todoRenderSpy = sinon.spy(this.todoView, "render");
      this.todoViewStub = sinon.stub(window, "TodoView")
        .returns(this.todoView);
      this.todo1 = new Backbone.Model({id:1});
      this.todo2 = new Backbone.Model({id:2});
      this.todo3 = new Backbone.Model({id:3});
      this.view.collection = new Backbone.Collection([
        this.todo1,
        this.todo2,
        this.todo3
      ]);
      this.view.render();
    });
    
    afterEach(function() {
      window.TodoView.restore();
    });
    
    it("creates a Todo view for each todo item", function() {
      expect(this.todoViewStub).toHaveBeenCalledThrice();
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo1});
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo2});
      expect(this.todoViewStub).toHaveBeenCalledWith({model:this.todo3});
    });
    
    it("renders each Todo view", function() {
      expect(this.todoRenderSpy).toHaveBeenCalledThrice();
    });
    
    it("appends the todo to the todo list", function() {
      expect($(this.view.el).children().length).toEqual(3);
    });
    
  });
  
});