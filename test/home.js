var app     = require('../app');
var request = require('supertest')(app);

describe('At Home Controller', function() {

  describe('/GET /', function() {
    it('it should return status 200', function(done) {
      request.get('/')
          .end(function(err, res) {
        res.status.should.equal(200);
        done();
      });
    });
  });

  describe('/POST /login', function() {
    it('it should not login and it should redirect to /', function() {
      var loginVazio = {user: {name: '', email: ''}};

      request.post('/login')
        .send(loginVazio)
        .end(function(err, res) {
          res.headers.location.should.equal('/');
        });
    });

    it('it should login and it should redirect to /contacts', function() {
      var login = {user: {name: 'Teste', email: 'teste@teste'}};

      request.post('/login')
        .send(login)
        .end(function(err, res) {
          res.headers.location.should.equal('/contacts');
        });
    });
  });

  describe('/GET /logout', function() {
    it('it should redirect to /', function(done) {
      request.get('/logout')
        .end(function(err, res) {
          res.headers.location.should.equal('/');
          done();
        });
    });
  });

});