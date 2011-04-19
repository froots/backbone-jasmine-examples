var TodoView = Backbone.View.extend({
  
  tagName: "li",
  
  initialize: function(options) {
    this.template = Handlebars.compile(options.template || "");
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
  
});