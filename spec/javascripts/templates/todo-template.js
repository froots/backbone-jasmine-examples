beforeEach(function() {
  this.templates = _.extend(this.templates || {}, {
    todo: '<a href="#todo/{{id}}"{{#if done}} class="done"{{/if}}>' +
          '<h2>{{title}}</h2></a>'
  });
});