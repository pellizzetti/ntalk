var app     = require('../app');
var request = require('supertest')(app);

describe('At Contacts Controller', function() {

  describe('When user is logged in', function() {

    var login   = {user: {name: 'Teste', email: 'teste@teste'}};
    var contact = {contact: {name: 'Teste', email: 'teste@teste'}};
    var cookie;

    beforeEach(function() {
      	request.post('/login')
        	   .send(login)
        	   .expect(200)
        	   .end(function(err, res) {
        	cookie = res.headers['set-cookie'];
        });
    });

    describe('/GET /contacts', function() {
	    it('it should return status 200', function() {
	      var req = request.get('/contacts');
	      
	      req.cookies = cookie;
	      req.end(function(err, res) {
	      	res.status.should.equal(200);
	      });
	    });
	});

    describe('/POST /contact', function() {
	    it('it should POST a contact and it should redirect to /contacts', function() {
	      var req = request.post('/contact');
	      
	      req.cookies = cookie;
	      req.send(contact).end(function(err, res) {
	        res.headers.location.should.equal('/contacts');
	      });
	    });
	});
    
  });

	describe('When user is not logged in', function() {

		describe('/GET /contacts', function() {
			it('it should redirect to /', function(done) {
				request.get('/contacts')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

		describe('/GET /contact/1', function() {
			it('it should redirect to /', function(done) {
				request.get('/contact/1')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

		describe('/GET /contact/1/edit', function() {
			it('it should redirect to /', function(done) {
				request.get('/contact/1/edit')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

		describe('/POST /contact', function() {
			it('it should not POST a contact and it should redirect to /', function(done) {
				request.post('/contact')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

		describe('/DELETE /contacts/1', function() {
			it('it should not DELETE a contact and it should redirect to /', function(done) {
				request.del('/contacts/1')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

		describe('/PUT /contact/1', function() {
			it('it should not PUT a contact and it should redirect to /', function(done) {
				request.put('/contact/1')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});

	});

});