describe('ToDo model', function() {
  
  describe('when instantiated', function() {
    
    beforeEach(function() {
      this.todo = new ToDo({
        title: 'Rake leaves',
        tags: ['garden', 'weekend']
      });
    });
    
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
  
});