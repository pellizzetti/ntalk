var express        = require('express');
var session        = require('express-session');
var bodyParser     = require('body-parser');
//var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');
var consign        = require('consign');
var hbs            = require('hbs');

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

//app.use(cookieParser('ntalk'));

app.use(methodOverride('_method'));

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

app.listen(5777, function() {
	console.log("Server rodando em localhost:5777");
});
