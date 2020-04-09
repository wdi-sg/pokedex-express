/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const app = express()


// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

/**
 * ===================================
 * routes involving React.js
 * ===================================
 */

let data = {
  people: [
    "Yehuda Katz",
    "Alan Johnson",
    "Charles Jolley"
  ]
}

app.get('/', (req, res) => {
  res.render('practice', data);
})

app.get('/first', (req, res) => {
  jsonfile.readFile('google.json', (err, obj) => {
  // put render here

  res.render('practice', obj)
  })
})








app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
