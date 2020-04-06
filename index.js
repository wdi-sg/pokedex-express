/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
let pokedex = [];
let filePromise = jsonfile.readFile(file).then((obj) => {
  console.log("get!");
  pokedex = obj.pokemon;
});

const express = require('express');
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/list', (req, res) => {
  let results = [];
  for (let i = 0; i < pokedex.length; i++) {
    let mon = pokedex[i].name;
    results.push(`<a href="pokemon/${mon.toLowerCase()}">${mon}</a>`);
  }
  res.send(results.join("<br>"));
});

app.get('/pokemon/:name', (req, res) => {
  res.send(`pokemon: ${req.params.name} ${req.path}`);
});

app.get('*', (req, res) => {
  // send res with some data (a string)
  res.send(req.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
