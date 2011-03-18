beforeEach(function() {
  
  this.createValidResponse = function(responseText) {
    return [
      200,
      {"Content-Type": "application/json"},
      JSON.stringify(responseText)
    ];
  };  

});
