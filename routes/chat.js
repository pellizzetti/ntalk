module.exports = function(app) {
	var chat = app.controllers.chat;
	var auth = require('./../middlewares/authenticator');
	
	app.get('/chat', auth, chat.index);
};