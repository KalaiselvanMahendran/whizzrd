var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var path = require('path');

var app = express();
var port = process.env.PORT || 4000;

var configDB = require('./server/config/database');
mongoose.connect(configDB.url);
require('./server/config/passport')(passport);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
				  secret: 'AnyStringYouWant',
				  resave: true,
				  saveUninitialized: true,
				  store: new MongoStore({ mongooseConnection: mongoose.connection, 
				  						  ttl: 730 * 24 * 60 * 60 //2 years
				  						})
				}));
app.use(passport.initialize());
app.use(passport.session()); 
app.use(flash()); 

app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'server', 'views'));

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.static(path.resolve(__dirname, 'server')));

app.get('/', function(req, res){
	res.send('whizzrd starts today..');
});

// Router for authentication data
var auth = express.Router();
require('./server/app/routes/auth')(auth, passport);
app.use('/auth', auth);

var secure = express.Router();
require('./server/app/routes/secure.js')(secure, passport);
require('./server/app/routes/cityRoutes')(secure);
require('./server/app/routes/serviceRoutes')(secure);
app.use('/secure', secure);

app.listen(port, function(){
	console.log('server is running on port ' + port);
});
