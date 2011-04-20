var TodoListView = Backbone.View.extend({
  tagName: "ul",
  className: "todos",
  
  initialize: function() {
    _.bindAll(this, "addTodo");
  },
  
  render: function() {
    this.collection.each(this.addTodo);
  },
  
  addTodo: function(todo) {
    var view = new TodoView({model: todo});
    $(this.el).append(view.render().el);
  }
  
});