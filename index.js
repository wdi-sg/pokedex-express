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
  for (let mon of pokedex) {
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
    `They are weak against Pokemon of these type(s): ${mon.weaknesses.join(', ')}`,
    `They are known to grow to ${mon.height} and weigh ${mon.weight} fully grown.`,
    mon.candy === "None" ? `${mon.name} don't really like candy.` : `${mon.name} love ${mon.candy}!`,
    mon.egg === "Not in Eggs" ? `They are not in eggs.` : `Their eggs take ${mon.egg} to hatch.`,
    mon.next_evolution ? `They'll evolve into ${mon.next_evolution[0].name}!` : `They don't have any evolutions.`,
  ];
  res.send(monFormat.join('<br>'));
});

app.get('/type/:type', (req, res) => {
  let results = [];

  for (let mon of pokedex) {
    let monType = mon.type.map(ele => ele.toLowerCase());
    console.log(monType);
    if (monType.includes(req.params.type.toLowerCase())) {
      results.push(mon);
    }
  }

  results = results.map(function (mon) {
    return `<a href='../pokemon/${mon.name.toLowerCase()}'>${mon.num}: ${mon.name}</a>`;
  });
  results.unshift(`These are all the Pokemon of ${req.params.type} type in the first 151!`);
  res.send(results.join('<br>'));
});

app.get('/weakness/:weak', (req, res) => {
  let results = [];

  for (let mon of pokedex) {
    let monWeak = mon.weaknesses.map(ele => ele.toLowerCase());
    console.log(monWeak);
    if (monWeak.includes(req.params.weak.toLowerCase())) {
      results.push(mon);
    }
  }

  results = results.map(function (mon) {
    return `<a href='../pokemon/${mon.name.toLowerCase()}'>${mon.num}: ${mon.name}</a>`;
  });
  results.unshift(`These are the Pokemon weak against ${req.params.weak} types!`);
  res.send(results.join('<br>'));
});

app.get('/nextevolution/:end', (req, res) => {
  let results = pokedex.filter(
    (mon) =>
      mon.name.toLowerCase().includes(req.params.end.toLowerCase())
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
  let evolvesFrom = mon.prev_evolution;
  console.log(evolvesFrom);

  evolvesFrom = evolvesFrom.map(function (mon) {
    return `<a href='../pokemon/${mon.name.toLowerCase()}'>${mon.num}: ${mon.name}</a>`;
  });
  evolvesFrom.unshift(`These are the Pokemon that evolve into ${req.params.end[0].toUpperCase()}${req.params.end.slice(1)}!`);
  res.send(evolvesFrom.join('<br>'));
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
