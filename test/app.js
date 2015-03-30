describe('tools', function () {
  before(function() {
    mongoose.connect('mongodb://localhost/test');
  });

  it('should exist', function (done) {
    tools.should.be.ok;
    tools.should.not.be.type('undefined');
    done();
  });

  it('should be able to create a simple model', function(done) {
    tools.createModel('SimpleTest', testOpts.schemas.simple, done);
  });

  it('should be able to create a model using each of the Mongoose schema types', function(done) {
    tools.createModel('ComplexTest', testOpts.schemas.complex, done);
  });
});