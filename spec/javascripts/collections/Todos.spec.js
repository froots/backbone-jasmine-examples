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
    
  })
  
});