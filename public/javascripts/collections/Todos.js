var Todos = Backbone.Collection.extend({
  
  url: '/todos',
  
  parse: function(response) {
    var todos = response.response.todos;
    return _(todos).map(function(todo) {
      return _.extend(todo, {
        list: response.response.list
      });
    });
  },
  
  comparator: function(todo) {
    return todo.get("priority");
  }
  
});