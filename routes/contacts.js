module.exports = function(app) {
	var contacts = app.controllers.contacts;
	var auth     = require('./../middlewares/authenticator');

	app.get('/contacts', auth, contacts.index)
	   .get('/contact/:id', auth, contacts.getById)
	   .post('/contact', auth, contacts.create)
	   .get('/contact/:id/edit', auth, contacts.editById)
	   .put('/contact/:id', auth, contacts.update)
	   .delete('/contacts/:id', auth, contacts.deleteById);
};