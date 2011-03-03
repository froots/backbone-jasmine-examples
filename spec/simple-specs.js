describe("simple specs", function() {
  
  describe("Episode model", function() {
    
    beforeEach(function() {
      this.episode = new Episode({
        title: "Hollywood - Part 2",
        id: 123
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
  
    describe("when saving", function() {
      
      beforeEach(function() {
        this.server = sinon.fakeServer.create();
      });

      afterEach(function() {
        this.server.restore();
      });
      
      it("should fire the change event", function() {
        var callback = sinon.spy();
        
        var episode = new Episode({
          url: "/episode/123"
        });

        // Set how the fake server will respond
        // This reads: a GET request for /episode/123 will return a 
        // 200 response of type application/json with the given JSON response body
        this.server.respondWith('{"id":123,"title":"Hollywood - Part 2"}');

        // Bind to the change event on the model
        episode.bind('change', callback);

        // makes an ajax request to the server
        episode.fetch(); 

        // Fake server responds to the request
        this.server.respond(); 

        // Expect that the spy was called with the newly updated model
        expect(callback).toHaveBeenCalled();
        expect(callback.getCall(0).args[0].attributes)
          .toEqual({
            id: 123,
            title: "Hollywood - Part 2",
            url: "/episode/123"
          });
        
      });
      
    });
    
  });
  

})

