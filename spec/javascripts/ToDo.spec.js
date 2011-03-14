describe('ToDo model', function() {
  
  describe('when instantiated', function() {
    
    it('should exhibit attributes', function() {
      var todo = new ToDo({
        title: 'Rake leaves',
        tags: ['garden', 'weekend']
      });
      expect(todo.get('title')).toEqual('Rake leaves');
      expect(todo.get('tags').length).toEqual(2);
      expect(todo.get('tags')[0]).toEqual('garden');
      expect(todo.get('tags')[1]).toEqual('weekend');
    });
    
  });
  
});