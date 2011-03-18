var Todos = Backbone.Collection.extend({
  url: '/todos',
  parse: function(response) {
    return response.response.todos;
  },
  comparator: function(todo) {
    return todo.get("priority");
  }
});