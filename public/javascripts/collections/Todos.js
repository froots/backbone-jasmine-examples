var Todos = Backbone.Collection.extend({
  comparator: function(todo) {
    return todo.get("priority");
  }
});