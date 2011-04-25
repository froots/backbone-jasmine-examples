var TodoView = Backbone.View.extend({
  
  tagName: "li",
  
  initialize: function(options) {
    _.bindAll(this, "edit");
    this.template = Handlebars.compile(options.template || "");
  },
  
  events: {
    "click a.edit": "edit"
  },
  
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  
  edit: function() {
    this.$('h2').fadeOut(500);
    this.$('input.edit').fadeIn(500);
  }
  
});