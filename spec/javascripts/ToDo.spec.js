describe('Todo model', function() {
  
  beforeEach(function() {
    this.todo = new Todo({
      title: 'Rake leaves',
      tags: ['garden', 'weekend']
    });
    this.Col = Backbone.Collection.extend({url: '/collection'});
    this.collection = new this.Col([this.todo]);
  });
  
  describe('when instantiated', function() {
    
    it('should exhibit attributes', function() {
      expect(this.todo.get('title')).toEqual('Rake leaves');
      expect(this.todo.get('tags').length).toEqual(2);
      expect(this.todo.get('tags')[0]).toEqual('garden');
      expect(this.todo.get('tags')[1]).toEqual('weekend');
    });
    
    it('should set the priority to default value', function() {
      expect(this.todo.get('priority')).toEqual(3);
    });
    
    it('should set the done property to default value', function() {
      expect(this.todo.get('done')).toEqual(false);
    });
    
  });
  
  describe('urls', function() {
    
    it('should set the URL to the collection URL when no id is set', function() {
      expect(this.todo.url()).toEqual('/collection');
    });
    
    it('should set the URL to the collection URL plus the id when id is set', function() {
      this.todo.id = 1;
      expect(this.todo.url()).toEqual('/collection/1');
    })
    
  });
  
  describe('when saving', function() {
    
    beforeEach(function() {
      this.server = sinon.fakeServer.create();
    });
    
    afterEach(function() {
      this.server.restore();
    })
    
    it('should not save when title is undefined', function() {
      var errorSpy = sinon.spy();
      this.todo.bind('error', errorSpy);
      this.todo.save({'title': ''});
      expect(errorSpy).toHaveBeenCalledOnce();    
      expect(errorSpy).toHaveBeenCalledWith(this.todo, "cannot have an empty title");
      expect(this.server.requests.length).toEqual(0);
    });
    
    it('should make a save request to the server', function() {
      this.todo.save();
      expect(this.server.requests[0].method).toEqual('POST');
      expect(this.server.requests[0].url).toEqual('/collection');
      expect(JSON.parse(this.server.requests[0].requestBody)).toEqual(this.todo.attributes);
    });
    
  });
  
});