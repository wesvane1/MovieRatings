var express = require('express');
var path = require('path');
var http = require('http');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var index = require('./src/app/server/routes/app');
const movieRoutes = require('./src/app/server/routes/movies')
const reviewRoutes = require('./src/app/server/routes/reviews')


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());

app.use(logger('dev'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

app.use(express.static(path.join(__dirname, 'dist/movieRatings/browser')));

app.use('/', index);
app.use('/movie', movieRoutes);
app.use('/review', reviewRoutes);


mongoose.connect('mongodb://localhost:27017/movieReviews', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database!');
  })
  .catch((err) => {
    console.log('Connection failed: ' + err);
  });

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../movieRatings/src/index.html'));
});

const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, function() {
  console.log('API running on localhost: ' + port)
});
