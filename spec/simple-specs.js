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
    
  });
  

})

