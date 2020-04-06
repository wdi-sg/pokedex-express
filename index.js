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
    let mon = pokedex[i];
    results.push(`<a href='pokemon/${mon.name.toLowerCase()}'>${mon.num}: ${mon.name}</a>`);
  }
  res.send(results.join('<br>'));
});

app.get('/pokemon/:name', (req, res) => {
  let results = pokedex.filter(
    (mon) =>
      mon.name.toLowerCase().includes(req.params.name.toLowerCase())
  );

  if (results.length > 1) {
    let results = [];
    for (let mon of results) {
      results.push(`<a href='${mon.name.toLowerCase()}'>${mon.num}: ${mon.name}</a>`);
    }
    results.unshift(
      "There seems to be more than one Pokemon with a name like that!\n" +
      "Did you want one of these?");
    res.send(results.join('<br>'));
  }

  let mon = results[0];
  let monEvoFrom = mon.prev_evolution ? mon.prev_evolution : "";
  let monEvoTo = mon.next_evolution ? mon.next_evolution : "";
  let monFormat = [
    `<img src=${mon.img}>`,
    `This is Pokemon #${mon.num}, ${mon.name}!`,
    `They are of type(s): ${[...mon.type].join(', ')}`,
  ];
  res.send(monFormat.join('<br>'));
});

app.get('*', (req, res) => {
  // send res with some data (a string)
  res.send("Welcome to the online Pokedex! You might want to try <a href='list'>browsing the main list</a>");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
