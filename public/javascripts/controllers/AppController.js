var AppController = Backbone.Controller.extend({
  routes: {
    "": "index"
  },
  
  index: function() {
    this.todos = new Todos();
    this.todosView = new TodosView({
      collection: this.todos
    });
  }
});