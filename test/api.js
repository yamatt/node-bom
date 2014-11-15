var app = require('../bom/app'),
    request = require('supertest');
    
describe('BOM API',function(){

  before(function(done){
    var server = app.listen(app.get('port'), done);
  });

  it('GET / should return 200',function(done){
    request(app)
      .get('/')
      .expect(200,done);
  });

  it('POST / should return 201',function(done){
    request(app)
      .post('/')
      .set('Content-Type','multipart/encrypted')
      .send("example data")
      .expect(201,done);
  });
});
