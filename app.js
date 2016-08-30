process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const KEY    = 'ntalk.sid';
const SECRET = 'ntalk';

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
var io     = require('socket.io')(server);
var cookie = cookieParser('ntalk');
var store  = new session.MemoryStore();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(methodOverride('_method'));
app.use(cookie);

app.use(session({
	resave: true, 
	saveUninitialized: true,
	key: KEY,
	secret: SECRET, 
	store: store
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static(__dirname + '/public'));

io.use(function(socket, next) {
	var data = socket.request;
	
	cookie(data, {}, function(err) {
		var sessionID = data.signedCookies[KEY];
		
		store.get(sessionID, function(err, session) {
			if (err || !session) {
				return next(new Error('Acesso negado'));
			} else {
				socket.handshake.session = session;
				return next();
			}
		});
	});
});

consign({verbose: false})
	.include('models')
	.then('controllers')
	.then('routes')
	.into(app);

consign({verbose: false})
	.include('sockets')
	.into(io);
	
app.use(error.notFound);
app.use(error.serverError);

server.listen(port, function() {
	console.log("Running at http://localhost:" + port);
});