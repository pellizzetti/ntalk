module.exports = function(io) {
	var crypto  = require('crypto');
	var Redis   = require('ioredis');
	var redis   = new Redis();
	var sockets = io.sockets;
	var online  = {};

	sockets.on('connection', function(client) {
		var session = client.handshake.session;
		var user    = session.user;

		redis.sadd('online', user.email, function(err) {
			redis.smembers('online', function(err, emails) {
				emails.forEach(function(email) {
					client.emit('notify-online', email);
					client.broadcast.emit('notify-online', email);
				});
			});
		});
		
		client.on('send-server', function(msg) {
			var chatroom = session.chatroom;
			var data     = {email: user.email, chatroom: chatroom};

			msg = "<b>" + user.name + ":</b> " + msg + "<br>";
			redis.rpush(chatroom, msg);
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
			client.broadcast.emit('new-chatroom', data);
			client.join(chatroom);

			var msg = "<b>" + user.name + ":</b> entrou.<br>";
			redis.lrange(chatroom, 0, -1, function(err, msgs) {
				msgs.forEach(function(msg) {
					client.emit('send-client', msg);
				});
				redis.rpush(chatroom, msg);
				sockets.in(chatroom).emit('send-client', msg);
			});
		})

		.on('disconnect', function () {
			var chatroom = session.chatroom;
			var msg      = "<b>" + user.name + "</b> saiu.<br>";

			redis.rpush(chatroom, msg);
			client.broadcast.emit('notify-offline', user.email);
			sockets.in(chatroom).emit('send-client', msg);
			redis.srem('online', user.email);
			client.leave(session.chatroom);
		});

	});
};