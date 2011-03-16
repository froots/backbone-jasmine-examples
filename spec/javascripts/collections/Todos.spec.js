describe("Todos collection", function() {
  
  beforeEach(function() {
    this.todos = new Todos();
    this.todoStub = sinon.stub(window, 'Todo');
  });
  
  afterEach(function() {
    this.todoStub.restore();
  });
  
  describe("When instantiated with model literal", function() {
    
    beforeEach(function() {
      this.model = new Backbone.Model({id: 5, title: 'Foo'})
      this.todoStub.returns(this.model);
      this.todos.add(this.model);
    });
    
    it("should have 1 Todo model", function() {
      expect(this.todos.length).toEqual(1);
    });
    
    it("should find a model by id", function() {
      expect(this.todos.get(5)).toEqual(this.model);
    });
    
    it("should find a model by index", function() {
      expect(this.todos.at(0)).toEqual(this.model);
    });
    
  });
  
  describe("When adding models", function() {
    
    beforeEach(function() {
      this.todo1 = new Backbone.Model({
        id: 1,
        title: 'Todo 1',
        priority: 3
      });
      this.todo2 = new Backbone.Model({
        id: 2,
        title: 'Todo 2',
        priority: 2
      });
      this.todo3 = new Backbone.Model({
        id: 3,
        title: 'Todo 3',
        priority: 1
      });
      this.todo4 = new Backbone.Model({
        id: 4,
        title: 'Todo 4',
        priority: 2
      });
    });
    
    it("should order models by priority by default", function() {
      this.todos.add([this.todo1, this.todo2, this.todo3, this.todo4]);
      expect(this.todos.at(0)).toBe(this.todo3);
      expect(this.todos.at(1)).toBe(this.todo4);
      expect(this.todos.at(2)).toBe(this.todo2);
      expect(this.todos.at(3)).toBe(this.todo1);
    });
    
  });
  
});