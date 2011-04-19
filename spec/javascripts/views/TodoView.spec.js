describe("TodoView", function() {
  
  beforeEach(function() {
    this.model = new Backbone.Model({
      id: 1,
      title: "My Todo",
      priority: 2,
      done: false
    });
    this.view = new TodoView({
      model: this.model,
      template: this.templates.todo
    });
    setFixtures('<ul class="todos"></ul>');
  });
  
  it("loads the Todo template", function() {
    expect(this.templates.todo).toBeDefined();
  });
  
  describe("Root element", function() {
    
    it("is a LI", function() {
      expect(this.view.el.nodeName).toEqual("LI");
    });
    
  });
  
  describe("Rendering", function() {
    
    it("returns the view object", function() {
      expect(this.view.render()).toEqual(this.view);
    });
    
    it("produces the correct HTML", function() {
      this.view.render();
      expect(this.view.el.innerHTML).toEqual('<a href="#todo/1"><h2>My Todo</h2></a>');
    });
    
    describe("Template", function() {
      
      beforeEach(function() {
        $("ul.todos").append(this.view.render().el);
      });
      
      it("has the correct URL", function() {
        expect($(this.view.el).find('a')).toHaveAttr('href', '#todo/1');
      });

      it("has the correct title text", function() {
        expect($(this.view.el).find('h2')).toHaveText('My Todo');
      });
      
    });
    
    describe("When todo is done", function() {
      
      beforeEach(function() {
        this.model.set({done: true}, {silent: true});
        $("ul.todos").append(this.view.render().el);
      });
      
      it("has a done class", function() {
        expect($(this.view.el).find('a')).toHaveClass("done");
      });
      
    });
    
  });
  
});