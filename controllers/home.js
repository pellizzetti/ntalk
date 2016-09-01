module.exports = function(app) {
	var User = app.models.user;
	
	var HomeController = {
		
		index: function(req, res) {
			res.render('home/index');
		},

		login: function(req, res) {
			var query = {email: req.body.user.email};

			User.findOne(query)
				.select('name email')
				.exec(function(err, user) {
					if (user) {
						req.session.user = user;
						res.redirect('/contacts');
					} else {
						var user = req.body.user;
						User.create(user, function(err, user) {
							if (err) {
								console.log(err);
								res.redirect('/');
							} else {
								req.session.user = user;
								res.redirect('/contacts');
							}
						});
					}
				});
		},

		logout: function(req, res) {
			req.session.destroy;
			res.redirect('/');
		}
	};
	
	return HomeController;
};