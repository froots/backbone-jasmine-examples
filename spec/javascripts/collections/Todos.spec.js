describe("Todos collection", function() {
  
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
    
    this.todos = new Todos();
    this.todoStub = sinon.stub(window, 'Todo');
  });
  
  afterEach(function() {
    this.todoStub.restore();
  });
  
  describe("When instantiated with model literal", function() {
    
    beforeEach(function() {
      this.model = new Backbone.Model({id: 5, title: "Foo"});
      this.todoStub.returns(this.model);
      this.todos.add({id:5, title:"Foo"});
    });
    
    it("should have 1 Todo model", function() {
      expect(this.todos.length).toEqual(1);
    });
    
    it("should find a model by id", function() {
      expect(this.todos.get(5).get("id")).toEqual(this.model.get("id"));
    });
    
    it("should find a model by index", function() {
      expect(this.todos.at(0).get("id")).toEqual(this.model.get("id"));
    });
    
  });
  
  describe("When adding models", function() {
    
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
        this.validResponse(this.fixture)
      );
    });
    
    afterEach(function() {
      this.server.restore();
    });
    
    it("should make the correct request", function() {
      this.todos.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toEqual("/todos");
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
  
  describe("Custom finds", function() {
    
    beforeEach(function() {
      this.todos.add([this.todo1, this.todo2, this.todo3, this.todo4]);
    });
    
    describe("by priority", function() {
      
      it("should return only todos with the priority specified", function() {
        var priority1 = this.todos.findByPriority(2);
        expect(priority1.length).toEqual(2);
        expect(priority1[0].get('priority')).toEqual(2);
        expect(priority1[1].get('priority')).toEqual(2);
      });
      
    });
    
  });
  
});