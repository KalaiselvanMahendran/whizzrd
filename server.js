var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var flash = require('connect-flash');
var MongoStore = require('connect-mongo')(session);
var msg91 = require("msg91")("95265Ax7FE0jmCQht56209c00", "HAPSRV", "5677974de7fe87666f8b4572" );
var path = require('path');

var app = express();
var port = process.env.PORT || 7777;

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

// Router for authentication data
var auth = express.Router();
require('./server/app/routes/auth')(auth, passport);
app.use('/auth', auth);

var secure = express.Router();
require('./server/app/routes/secure.js')(secure, passport);
require('./server/app/routes/cityRoutes')(secure);
require('./server/app/routes/serviceRoutes')(secure);
require('./server/app/routes/servicesRoutes')(secure);
require('./server/app/routes/employeeRoutes')(secure);
require('./server/app/routes/bookingRoutes')(secure);
app.use('/secure', secure);

var book = express.Router();
require('./server/app/routes/book.js')(book, msg91);
require('./server/app/routes/customerRoutes.js')(book, passport, msg91);
app.use('/', book);

app.listen(port, function(){
	console.log('server is running on port ' + port);
});



