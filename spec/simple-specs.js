describe("simple specs", function() {
  
  describe("Episode model", function() {
    
    beforeEach(function() {
      this.episode = new Backbone.Model({
        title: "Hollywood - Part 2"
      });
    })
    
    it("should expose an attribute", function() {
      expect(this.episode.get("title"))
        .toEqual("Hollywood - Part 2");
    });
    
    it("should fire a callback when 'foo' is triggered", function() {
      var spy = sinon.spy();
      
      this.episode.bind('foo', spy);
      
      this.episode.trigger('foo');
      
      expect(spy).toHaveBeenCalled();
    });
    
  });
  

})

