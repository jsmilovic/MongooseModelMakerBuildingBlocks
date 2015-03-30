describe('MongooseModelMaker', function () {
  /*before(function() {
    mongoose.connect('mongodb://localhost/test');
  });*/

  it('should exist', function (done) {
    tools.should.be.ok;
    tools.should.not.be.type('undefined');
    done();
  });

  // ====================================
  //              Creation
  // ====================================

  it('should be able to create a simple model', function(done) {
    tools.createModel('SimpleTest', testOpts.schemas.simple.default, done);
  });

  it('should be able to create a model using each of the Mongoose schema types', function(done) {
    tools.createModel('ComplexTest', testOpts.schemas.complex.default, done);
  });

  it('should be able to create a model with a very long name', function(done) {
    tools.createModel('LongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTest', testOpts.schemas.simple.default, done);
  });

  it('should throw an error on being given an invalid schema', function(done) {
    try {
      tools.createModel('InvalidTest', testOpts.schemas.invalid, done);
    } catch(e) {
      done();
    }
  });

  // ====================================
  //              Retrieval
  // ====================================

  it('should be able to retrieve a simple model', function(done) {
    var model = tools.getModel('SimpleTest');
    if(model.modelName == 'SimpleTest') {
      done();
    }
  });

  it('should be able to retrieve a model with a very long name', function(done) {
    var model = tools.getModel('LongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTest');
    if(model.modelName == 'LongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTest') {
      done();
    }
  });

  it('should throw an error on being asked to retrieve a model that does not exist', function(done) {
    try {
      tools.getModel('NonexistentTest');
    } catch(e) {
      done();
    }
  })

  // ====================================
  //              Update
  // ====================================

  it('should be able to update a simple model', function(done) {
    tools.updateSchema('SimpleTest', testOpts.schemas.simple.updated, done);
  });

  it('should be able to update a complex model', function(done) {
    tools.updateSchema('ComplexTest', testOpts.schemas.complex.updated, done);
  });

  // ====================================
  //              Removal
  // ====================================

  it('should be able to remove a simple model', function(done) {
    tools.deleteModel('SimpleTest', done);
  });

  it('should be able to remove a complex model', function(done) {
    tools.deleteModel('ComplexTest', done);
  });

  it('should be able to remove a model with a very long name', function(done) {
    tools.deleteModel('LongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTestLongNameTest', done);
  });
});