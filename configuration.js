// 2.VREATE EXPRESS CONFIGURATIONS OTHER THAN THE MAIN EXPRESS APP REQUIRED TO RUN 

var bodyParser = require('body-parser'),
  cors = require('cors'),
  logger = require('morgan'),
  path = require('path'),
  cookieParser = require('cookie-parser'),
  serveStatic = require('serve-static');
  // enforce = require('express-sslify');
  // passport = require('passport'),
  // session = require('express-session'),
  secrets = require('./dbconfig/secrets');
  history = require('vue-history-api-fallback');
  options = require('./router');
 



//CORS CONFIGURATION

const incomingOriginWhitelist = [
  //for machines that use 'origin'
  'https://localhost:4000',
  //for machines that use 'host'
  'localhost:4000',
  'https://api.twitter.com',
  'api.twitter.com',

]

//CORS only takes requests hence the (req , next )
//Takes the request checks the header and passes it on to the next process

const corsConfig = (req, next) => {
  let corsOptions;
  let incomingOrigin = req.header('host') || req.header('origin');
  if (incomingOriginWhitelist.indexOf(incomingOrigin !== -1)) {
    corsOptions = {
      origin: true
    }
    return next(null, corsOptions);
  } else
    corsOptions = {
      origin: false
    }
  return next(new Error('You like going under the hood, i like you. Contact me '))

}

module.exports = (app, express) => {

  // require('./dbconfig/passport')(passport);

  const api = require('./routes/api')(express);


  //Initializing the Cors configuration 

  app.use(cors(corsConfig), (req, res, next) => {
    next();
  })

  //View Engine Setup. But we are using Vue so no need 

  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');

  //Initializing body parser 
  app.use(bodyParser.json());
  app.use(history({options}))
  // app.use(cookieParser);
  app.use(bodyParser.urlencoded({
    extended: false
  }))
  app.use(serveStatic(__dirname + "/dist"));
  app.use(enforce.HTTPS({
    trustProtoHeader:true
  }))

  // app.use(session({
  //   secret: 'thisIsNotASecret',
  //   saveUninitialized:true,
  //   resave: false
  // }));
  // app.use(passport.initialize());
  // app.use(passport.session());

  app.use(express.static(path.join(__dirname, 'public'))) //For serving ststic files from root path
  app.use('/api', api)
  app.use(logger('short'))


  //catch errors 
  app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  })


  // error handler 
  app.use((err, req, res) => {
    res.locals.message = err.message

    //Only prviding errors in development 

    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.render('error')
  })
}
