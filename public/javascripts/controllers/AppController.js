var AppController = Backbone.Controller.extend({
  
  routes: {
    "": "index",
    "todo/:id": "todo"
  },
  
  index: function() {
    this.todos = new Todos();
    this.todosView = new TodosView({
      collection: this.todos
    });
  },
  
  todo: function(id) {
    this.todo = new Todo({id:id});
    this.todoDetailView = new TodoDetailView({
      model: this.todo
    });
  }
});