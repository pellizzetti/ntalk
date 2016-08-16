process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express        = require('express');
var session        = require('express-session');
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var methodOverride = require('method-override');
var consign        = require('consign');
var hbs            = require('hbs');
var error          = require('./middlewares/error');

var app    = express();
var server = require('http').Server(app);
var port   = process.env.PORT || 5777;
var io     = require('socket.io')(server)

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
app.use(cookieParser('ntalk'));

app.use(session({
	resave: true, 
	saveUninitialized: true, 
	secret: 'SOMERANDOMSECRETHERE', 
	cookie: { maxAge: 60000 }
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

consign()
	.include('controllers')
	.then('routes')
	.into(app);
	
io.sockets.on('connection', function (client) {
	client.on('send-server', function (data) { 
		var msg = "<b>" + data.name + ":</b> " + data.msg + "<br>";
		client.emit('send-client', msg); 
		client.broadcast.emit('send-client', msg); 
	}); 
});
	
app.use(error.notFound);
app.use(error.serverError);

server.listen(port, function() {
	console.log("Running at http://localhost:" + port);
});
