var Episode = Backbone.Model.extend({
  url: function() {
    return "/episode/" + this.id;
  }
});

describe("Episode model", function() {
  beforeEach(function() {
    this.server = sinon.fakeServer.create();
  });
    
  afterEach(function() {
    this.server.restore();
  });

  it("should fire the change event", function() {
    var callback = sinon.spy();
    
    // Set how the fake server will respond
    // This reads: a GET request for /episode/123 
    // will return a 200 response of type 
    // application/json with the given JSON response body
    this.server.respondWith("GET", "/episode/123",
      [200, {"Content-Type": "application/json"},
      '{"id":123,"title":"Hollywood - Part 2"}']);

    var episode = new Episode({id: 123});
    
    // Bind to the change event on the model
    episode.bind('change', callback);
    
    // makes an ajax request to the server
    episode.fetch(); 
    
    // Fake server responds to the request
    this.server.respond(); 
        
    // Expect that the spy was called with the new model
    expect(callback.called).toBeTruthy();
    expect(callback.getCall(0).args[0].attributes)
      .toEqual({
        id: 123,
        title: "Hollywood - Part 2"
      });
    
  });

});