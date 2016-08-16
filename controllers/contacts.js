module.exports = function(app) {
	
	var ContactsController = {
		
		index: function(req, res) {
			var user     = req.session.user;
			var contacts = user.contacts;
			var params   = {user: user,
                            contacts: contacts};
			
			res.render('contacts/index', params);
		},

		create: function(req, res) {
			var user    = req.session.user;
			var contact = req.body.contact;
			
			user.contacts.push(contact);
			res.redirect('/contacts');
		},

		getById: function(req, res) {
			var id      = req.params.id;
			var contact = req.session.user.contacts[id];
			var params  = {contact: contact, 
                           id: id};

			res.render('contacts/show', params);
		},

		editById: function(req, res) {
			var id      = req.params.id;
			var user    = req.session.user;
			var contact = user.contacts[id];
			var params  = {user: user, 
                           contact: contact, 
                           id: id};

			res.render('contacts/edit', params);
		},
		
		deleteById: function(req, res) {
			var id   = req.params.id;
			var user = req.session.user;

			user.contacts.splice(id, 1);
			res.redirect('/contacts');
		},

		update: function(req, res) {
			var user    = req.session.user;
			var contact = req.body.contact;

			user.contacts[req.params.id] = contact;
			res.redirect('/contacts');
		}
		
	};

	return ContactsController;
};
