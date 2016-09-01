var app     = require('../app');
var request = require('supertest')(app);

describe('At Chat Controller', function() {
  
	describe('When user is logged in', function() {

		var login = {user: {name: 'Teste', email: 'teste@teste'}};
		var cookie;

		before(function() {
			request.post('/login')
				     .send(login)
				     .expect(200)
				     .end(function(err, res) {
				cookie = res.headers['Set-Cookie'];
			});
		});

		describe('/GET /chat', function() {
			it('it should return status 200', function() {
				var req = request.get('/chat');
				
				req.cookies = cookie;
				req.end(function(err, res) {
					res.status.should.equal(200);
				});
			});
		});
	});

	describe('When user is not logged in', function() {

		describe('/GET /chat', function() {
			it('it should redirect to /', function(done) {
				request.get('/chat')
					.end(function(err, res) {
						res.headers.location.should.equal('/');
						done();
					});
			});
		});
	});

});