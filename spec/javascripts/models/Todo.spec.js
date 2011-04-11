describe("Todo model", function() {
  
  beforeEach(function() {
    this.todo = new Todo({
      title: "Rake leaves",
      tags: ["garden", "weekend"]
    });
    var collection = {
      url: "/collection"
    };
    this.todo.collection = collection;
  });
  
  describe("when instantiated", function() {
    
    it("should exhibit attributes", function() {
      expect(this.todo.get("title")).toEqual("Rake leaves");
      expect(this.todo.get("tags").length).toEqual(2);
      expect(this.todo.get("tags")[0]).toEqual("garden");
      expect(this.todo.get("tags")[1]).toEqual("weekend");
    });
    
    it("should set the priority to default value", function() {
      expect(this.todo.get("priority")).toEqual(3);
    });
    
    it("should set the done property to default value", function() {
      expect(this.todo.get("done")).toEqual(false);
    });
    
  });
  
  describe("urls", function() {
    
    describe("when no id is set", function() {
      it("should return the collection URL", function() {
        expect(this.todo.url()).toEqual("/collection");
      });
    });
    
    describe("when id is set", function() {
      it("should return the collection URL and id", function() {
        this.todo.id = 1;
        expect(this.todo.url()).toEqual("/collection/1");
      });
    });
    
  });
  
  describe("when saving", function() {
    
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
      this.responseBody = '{"description":null,"done":false,"id":3,"position":null,"priority":3,"title":"Hello","tags":["garden","weekend"]}';
      this.server.respondWith(
        "POST",
        "/collection",
        [
          200,
          {"Content-Type": "application/json"},
          this.responseBody
        ]
      );
      this.eventSpy = sinon.spy();
    });
    
    afterEach(function() {
      this.server.restore();
    });
    
    it("should not save when title is empty", function() {
      this.todo.bind("error", this.eventSpy);
      this.todo.save({"title": ""});
      
      expect(this.eventSpy).toHaveBeenCalledOnce();    
      expect(this.eventSpy).toHaveBeenCalledWith(this.todo, "cannot have an empty title");
    });
    
    it("should make a save request to the server", function() {
      this.todo.save();
      expect(this.server.requests[0].method).toEqual("POST");
      expect(this.server.requests[0].url).toEqual("/collection");
      expect(JSON.parse(this.server.requests[0].requestBody)).toEqual(this.todo.attributes);
    });
    
    it("should fire a change event and provide returned todo model", function() {
      this.todo.bind("change", this.eventSpy);
      this.todo.save();
      this.server.respond();
      expect(this.eventSpy).toHaveBeenCalledOnce();
      expect(this.eventSpy.getCall(0).args[0].constructor).toBe(Todo);
      expect(this.eventSpy.getCall(0).args[0].attributes).toEqual(JSON.parse(this.responseBody));
    });
    
  });
  
});