const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json';

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

app.get('/', (req, res) => {
  res.send("Welcome!")
  //for loop iterate through and output everything
})

app.get('/type/*', (req, res) => {
  jsonfile.readFile(file, (err, obj) => {
    let pokedex = obj.pokemon
    let result = []
    let format = req.path.split('/type/');
    let userPath = format[1]

    for (var i = 0; i < pokedex.length; i++) {
      if (userPath == pokedex[i].type[0].toLowerCase()) {
        result.push(
          "<h1>" + pokedex[i].name + "</h1><ul>Weight: " + pokedex[i].weight + "</ul>");
      }
    }
    res.send(result.join())
  })
})

app.get('/*', (req, res) => {
  jsonfile.readFile(file, (err, obj) => {
    let pokedex = obj.pokemon
    let result = []
    let format = req.path.split('/');
    let userPath = format[1]

    for (var i = 0; i < pokedex.length; i++) {
      if (userPath == pokedex[i].name.toLowerCase()) {
        result.push(
          "<h1>" + pokedex[i].name + "</h1><ul>" + "<li>Weight: " + pokedex[i].weight + "</li>" + "<li>Height: " + pokedex[i].height + "</li>" + "<li>Type: " + pokedex[i].type + "</li>" + "</ul>")
      }
    }
    if (result.length < 1) {
      res.send("Could not find information about " + userPath + " Is that a new pokemon? Gotta catch em' all!");
      return;
    }
    res.send(result.join())
  })
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
