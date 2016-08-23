module.exports = function(app) {
	
	var ChatController = {
		
		index: function(req, res) {
			var params = {chatroom: req.query.chatroom};

			res.render('chat/index', params);
		}
	}
	
	return ChatController;
};