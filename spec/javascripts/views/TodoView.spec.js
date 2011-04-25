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
    
    // The following is a brittle test. It's best to
    // test for specific nodes and attributes using
    // the jasmine-jquery plugin matchers
    xit("produces the correct HTML", function() {
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
      
      it("has the correct input field value", function() {
        expect($(this.view.el).find('input.edit')).toHaveValue('My Todo');
        expect($(this.view.el).find('input.edit')).not.toBeVisible();
      });
      
    });
    
    describe("When todo is done", function() {
      
      beforeEach(function() {
        this.model.set({done: true}, {silent: true});
        $("ul.todos").append(this.view.render().el);
      });
      
      it("has a done class", function() {
        expect($(this.view.el).find('a:first-child')).toHaveClass("done");
      });
      
    });
    
  });
  
  describe("Edit state", function() {
    
    xdescribe("When edit button handler fired - Jasmine async", function() {
      
      beforeEach(function() {
        $('ul.todos').append(this.view.render().el);
        this.li = $('ul.todos li:first');
        this.li.find('a.edit').trigger('click');
      });
      
      it("shows the edit input field", function() {
        waits(510);
        runs(function() {
          expect(this.li.find('input.edit')).toBeVisible();
          expect(this.li.find('h2')).not.toBeVisible();          
        })
      });
      
    });
    
    describe("When edit button handler fired - sinon timers", function() {
      
      beforeEach(function() {
        this.clock = sinon.useFakeTimers();
        $('ul.todos').append(this.view.render().el);
        this.li = $('ul.todos li:first');
        this.li.find('a.edit').trigger('click');
        this.clock.tick(600);
      });
      
      afterEach(function() {
        this.clock.restore();
      });
      
      it("shows the edit input field", function() {
        expect(this.li.find('input.edit')).toBeVisible();
        expect(this.li.find('h2')).not.toBeVisible();
      });
      
    });
    
  });
  
});