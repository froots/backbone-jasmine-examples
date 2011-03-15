describe('Todo model', function() {
  
  beforeEach(function() {
    this.todo = new Todo({
      title: 'Rake leaves',
      tags: ['garden', 'weekend']
    });
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
    
  });
  
  describe('urls', function() {
    
    beforeEach(function() {
      this.Col = Backbone.Collection.extend({url: '/collection'});
      this.collection = new this.Col([this.todo]);
    })
    
    it('should set the URL to the collection URL when no id is set', function() {
      expect(this.todo.url()).toEqual('/collection');
    });
    
    it('should set the URL to the collection URL plus the id when id is set', function() {
      this.todo.id = 1;
      expect(this.todo.url()).toEqual('/collection/1');
    })
    
  });
  
});