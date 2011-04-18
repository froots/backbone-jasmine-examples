beforeEach(function() {
  this.templates = _.extend(this.templates || {}, {
    todo: '<a href="#todo/{{id}}"><h2>{{title}}</h2></a>'
  });
});