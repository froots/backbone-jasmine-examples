describe("simple specs", function() {
  
  describe("Episode model", function() {
    
    beforeEach(function() {
      this.episode = new Episode({
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
    
    it("should make the correct server request when saving", function() {
      var spy = sinon.spy(jQuery, 'ajax');
      
      this.episode.save();
      
      expect(spy).toHaveBeenCalled();
      expect(spy.getCall(0).args[0].url).toEqual("#");
      
      jQuery.ajax.restore();
    });
    
  });
  

})

