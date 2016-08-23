module.exports = function(app) {
	
	var HomeController = {
		
		index: function(req, res) {
			res.render('home/index');
		},

		login: function(req, res) {
			var name  = req.body.user.name;
			var email = req.body.user.email;
			
			if (name && email) {
				var user = req.body.user;
				user['contacts'] = [];
				req.session.user = user;
				res.redirect('/contacts');
			} else {
				res.redirect('/');
			}
		},

		logout: function(req, res) {
			req.session.destroy;
			res.redirect('/');
		}
	};
	
	return HomeController;
};