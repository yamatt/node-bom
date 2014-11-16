var app = require('../bom/app');
var should = require('should');
var request = require('supertest');
    
describe('API',function(){

  before(function(done){
    var server = app.listen(app.get('port'), done);
  });
  
  afterEach(function (done, a) {
      // remove any files created
      done()
  });

  it('GET / should return 200',function(done){
    request(app)
      .get('/')
      .expect(200,done);
  });

  it('POST / should return 201',function(done){
    request(app)
      .post('/')
      .send("example data")
      .set('Content-Type','multipart/encrypted')
      .expect(201,done);
  });
  
  it('POST / should return valid json',function(done){
    request(app)
      .post('/')
      .send("example data")
      .set('Content-Type','multipart/encrypted')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
          res.body.should.be.ok;
          res.body.should.be.an.instanceof(Object);
          res.body.should.have.property('id');
          done();
      });
  });
  
  it('GET /notexist should return 404',function(done){
    request(app)
      .get('/id')
      .expect(404, done);
  });
  
  it('should be able to place an object and get it back in return',function(done){
    request(app)
      .post('/')
      .send("example data")
      .set('Content-Type','multipart/encrypted')
      .expect('Content-Type', /json/)
      .end(function (err, res) {
          request(app)
          .get("/"+ res.body.id)
          .expect(200)
          .expect("example data");
          done()

      });
  });
});


