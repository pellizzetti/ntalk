module.exports = function(app) {
	var home = app.controllers.home;

	app.get('/', home.index)
	   .post('/login', home.login)
	   .get('/logout', home.logout);
};