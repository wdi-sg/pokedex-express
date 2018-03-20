const express = require('express');
const exphbs = require('express-handlebars');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', exphbs.create().engine);
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/names/:pokemon', (req, res) => {
  // send response with some data (a string)
  res.send(req.params.pokemon);
});

app.get('/', (req, res) => {
  // send response with some data (a HTML file)
  res.render('home');
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
