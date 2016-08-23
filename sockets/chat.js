module.exports = function(io) {
	var crypto  = require('crypto');
	var sockets = io.sockets;

	sockets.on('connection', function(client) {
		var session = client.handshake.session;
		var user    = session.user;

		client.on('send-server', function(msg) {
			var chatroom = session.chatroom;
			var data     = {email: user.email, chatroom: chatroom};

			msg = "<b>" + user.name + ":</b> " + msg + "<br>";
			client.broadcast.emit('new-message', data);
			sockets.in(chatroom).emit('send-client', msg);
		})

		.on('join', function(chatroom) {
			if (!chatroom) {
				var timestamp = new Date().toString();
				var md5 = crypto.createHash('md5');
				
				chatroom = md5.update(timestamp).digest('hex');
			}

			session.chatroom = chatroom;
			var data = {email: user.email, chatroom: chatroom};
			client.broadcast.emit('new-chat', data);
			client.join(chatroom);
		})

		.on('disconnect', function () {
			client.leave(session.chatroom);
		});

	});
};