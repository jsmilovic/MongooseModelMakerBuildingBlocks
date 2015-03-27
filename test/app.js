describe('tools', function () {
  it('should exist', function (done) {
    tools.should.be.ok;
    tools.should.not.be.type('undefined');
    done();
  });



  /*it('should be able to create a model', function(done) {
    app.createModel('Test Model', res, done);
  });

  it('should be listening at localhost:3000', function (done) {
    var headers = defaultHttpOptions('/');
    http.get(headers, function (res) {
      res.statusCode.should.equal(200);
      done();
    });
  });*/
});