module.exports = function(app) {
	var User = app.models.user;
	
	var ContactsController = {
		
		index: function(req, res) {
			var _id = req.session.user._id;

			User.findById(_id, function(err, user) {
				var contacts = user.contacts;
				var result   = {contacts: contacts};

				res.render('contacts/index', result);
			});
		},

		create: function(req, res) {
			var _id = req.session.user._id;

	        User.findById(_id, function(err, user) {
		        var contact = req.body.contact;

		        user.contacts.push(contact);
		        user.save(function() {
		        	res.redirect('/contacts');
		        });
		    });
		},

		getById: function(req, res) {
			var _id = req.session.user._id;

			User.findById(_id, function(err, user) {
				var contactId = req.params.id;
				var contact   = user.contacts.id(contactId);
				var result    = {contact: contact};

				res.render('contacts/show', result);
			});
		},

		editById: function(req, res) {
			var _id = req.session.user._id;
			User.findById(_id, function(err, user) {
				var contactId = req.params.id;
				var contact   = user.contacts.id(contactId);
				var result    = {contact: contact};

				res.render('contacts/edit', result);
			});
		},
		
		deleteById: function(req, res) {
			var _id = req.session.user._id;
			
			User.findById(_id, function(err, user) {
				var contactId = req.params.id;

				user.contacts.id(contactId).remove();
				user.save(function() {
					res.redirect('/contacts');
				});
			});
		},

		update: function(req, res) {
			var _id = req.session.user._id;
			
			User.findById(_id, function(err, user) {
				var contactId = req.params.id;
				var contact   = user.contacts.id(contactId);

				contact.name  = req.body.contact.name;
				contact.email = req.body.contact.email;
				user.save(function() {
					res.redirect('/contacts');
				});
			});
		}
		
	};

	return ContactsController;
};