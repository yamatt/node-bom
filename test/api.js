var app = require('../bom/app');
var should = require('should');
var request = require('supertest');
var fs = require('fs');
var url = require('url');

var TEST_FILE_DIR = __dirname + "/files"
    
describe('API',function(){

  before(function(done){
    fs.mkdir(TEST_FILE_DIR, function () {
        var server = app.set("file-dir", TEST_FILE_DIR).listen(app.get('port'), done);
    });
  });
  
  afterEach(function (done) {
    // need to recusively delete the directory or pass through the name of the files created and delete them
    //fs.rmdir(TEST_FILE_DIR, function () {
      done()
    //});
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
  
  it('Non-permitted files should return 404',function(done){
    request(app)
      .get('/notexist')
      .expect(404);
    request(app)
      .get('/../LICENSE')
      .expect(404);
      
    done();
  });
  
  it('should be able to post an object and for it to be written',function(done){
    request(app)
        .post('/')
        .send("example data")
        .set('Content-Type','multipart/encrypted')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var path = TEST_FILE_DIR + "/" + res.body.id
            fs.exists(path, function(exists) {
                if (exists) {
                    fs.readFile(path, "utf-8", function (err, data) {
                        if (!err) {
                            data.should.equal("example data");
                            done();
                        }
                        else {
                            throw new Error("Could not open file: " + path);
                        }
                    });
                }
                else {
                    throw new Error("File '" + path + "' does not exist.");
                }
            });
        });
    });
    
  it('POST / should return valid bom URL',function(done){
    request(app)
      .post('/')
      .send("example data")
      .set('Content-Type','multipart/encrypted')
      .set('BOM-APPLICATION-URI','bom://test.example.com')
      .end(function (err, res) {
          var bom_url = url.parse(res.body.id);
          bom_url.protocol.should.equal("bom");
          bom_url.host.should.equal("test.example.com");
          bom_url.pathname.should.exist();
          done();
      });
  });
});


