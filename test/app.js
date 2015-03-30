describe('tools', function () {
  /*before(function() {
    mongoose.connect('mongodb://localhost/test');
  });*/

  it('should exist', function (done) {
    tools.should.be.ok;
    tools.should.not.be.type('undefined');
    done();
  });

  it('should be able to create a simple model', function(done) {
    tools.createModel('SimpleTest', testOpts.schemas.simple, done);
  });

  it('should throw an error on being given an invalid schema', function(done) {
    try {
      tools.createModel('SimpleTest', testOpts.schemas.invalid, done);
    } catch(e) {
      done();
    }
  });

  it('should be able to create a model with a very long name', function(done) {
    tools.createModel('LongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTest', testOpts.schemas.simple, done);
  });

  it('should be able to create a model using each of the Mongoose schema types', function(done) {
    tools.createModel('ComplexTest', testOpts.schemas.complex, done);
  });
});