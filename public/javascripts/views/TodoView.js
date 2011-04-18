var TodoView = Backbone.View.extend({
  
  tagName: "li",
  
  render: function() {
    var template = '<a href="#todo/{{id}}"><h2>{{title}}</h2></a>';
    var output = template
      .replace("{{id}}", this.model.id)
      .replace("{{title}}", this.model.get('title'));
    $(this.el).html(output);
    return this;
  }
  
});