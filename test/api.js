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
  
  it('POST / should return valid bom json',function(done){
    request(app)
      .post('/')
      .send("example data")
      .set('Content-Type','multipart/encrypted')
      .set('BOM-APPLICATION-URI','bom://test.example.com')
      .expect('Content-Type', /json/)
      .expect(201)
      .end(function (err, res) {
          res.body.should.be.ok;
          res.body.should.be.an.instanceof(Object);
          res.body.should.have.property('id');
          
          var bom_url = url.parse(res.body.id);
          bom_url.protocol.should.equal("bom:");
          bom_url.host.should.equal("test.example.com");
          bom_url.pathname.should.not.equal(null);
          done();
      });
  });
  
  it('should be able to post an object and for it to be written',function(done){
    request(app)
        .post('/')
        .send("example data")
        .set('Content-Type','multipart/encrypted')
        .set('BOM-APPLICATION-URI','bom://test.example.com')
        .expect('Content-Type', /json/)
        .end(function (err, res) {
            var uri = url.parse(res.body.id);
            var path = TEST_FILE_DIR + "/" + uri.host + "/" + uri.pathname;
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
    
  it('should 404 on non-existent files',function(done){
    request(app)
      .get('/notexist')
      .expect(404, done);
  });
  
  it('should 404 on files out-side scope',function(done){
    request(app)
      .get('/../LICENSE')
      .expect(404, done);
  });
});


