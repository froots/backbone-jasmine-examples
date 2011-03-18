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
  
  describe("when fetching collection from server", function() {
    
    beforeEach(function() {
      this.fixture = this.fixtures.Todos.valid;
      this.fixtureTodos = this.fixture.response.todos;
      this.server = sinon.fakeServer.create();
      this.server.respondWith(
        "GET",
        "/todos",
        this.createValidResponse(this.fixture)
      );
      this.eventSpy = sinon.spy();
    });
    
    afterEach(function() {
      this.server.restore();
    });
    
    it("should parse the todos from the response", function() {
      this.todos.fetch();
      this.server.respond();
      expect(this.todos.length).toEqual(this.fixture.response.todos.length);
      expect(this.todos.get(1).get('title')).toEqual(this.fixture.response.todos[0].title)
    });
    
    it("should inject the list name for each todo", function() {
      this.todos.fetch();
      this.server.respond();
      var len = this.fixtureTodos.length;
      while (len--) {
        expect(this.todos.at(len).get('list')).toEqual(this.fixture.response.list);
      }
    });
    
  });
  
});