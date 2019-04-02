//===================================
// Configurations and set up
//===================================
const _ = require('lodash');
const promise = require("bluebird");
const jsonfile = promise.promisifyAll(require('jsonfile'));

const express = require('express');
const app = express();

let data;
const file = 'pokedex.json';

//===================================
// Server And Data Loader Function
//===================================
var startServer = function () {
    // read data before starting up server
    jsonfile.readFileAsync(file)
        .then((JSONContent) => {
            data = JSONContent;
        })
        .then(() => {
            app.listen(3000);
        });
}

// ===================================
// Request Handlers
// ===================================
var homeRequestHandler = function (request, response) {
    response.send(`Welcome to the online Pokedex!`);
}

var getPokemonByNameRequestHandler = function (request, response) {
    let pokemon;

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase()) {
            pokemon = o;
        }
    });

    if (pokemon !== undefined) {
        response.send(`This is ${ pokemon.name }, it is ${ pokemon.weight } in weight!`);
    } else {
        response.send(404, `Could not find pokedex information about ${ request.params.name }.`);
    }
}

var getPokemonByTypeRequestHandler = function (request, response) {
    let pokemons = [];

    _.forEach(data.pokemon, (o) => {
        for (let i = 0; i < o.type.length; i++) {
            if (o.type[i].toLowerCase() === request.params.someType.toLowerCase()) {
                pokemons.push(o.name);
            }
        }
    });

    if (pokemons.length > 0) {
        response.send(pokemons);
    } else {
        response.send(404, `Could not find type information about ${ request.params.someType }.`);
    }
}

var getPokemonByWeaknessRequestHandler = function (request, response) {
    let pokemons = [];

    _.forEach(data.pokemon, (o) => {
        for (let i = 0; i < o.weaknesses.length; i++) {
            if (o.weaknesses[i].toLowerCase() === request.params.someWeakness.toLowerCase()) {
                pokemons.push(o.name);
            }
        }
    });

    if (pokemons.length > 0) {
        response.send(pokemons);
    } else {
        response.send(404, `Could not find weakness information about ${ request.params.someWeakness }.`);
    }
}

var getPokemonPreEvolutionRequestHandler = function (request, response) {
    let pokemons = [];

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase() && "prev_evolution" in o) {
            for (let i = 0; i < o.prev_evolution.length; i++) {
                pokemons.push(o.prev_evolution[i].name);
            }
        }
    });

    if (pokemons.length > 0) {
        response.send(pokemons);
    } else {
        response.send(404, `Could not find previous evolution information for ${ request.params.name }`);
    }
}

var getPokemonNextEvolutionRequestHandler = function (request, response) {
    let pokemons = [];

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase() && "next_evolution" in o) {
            for (let i = 0; i < o.next_evolution.length; i++) {
                pokemons.push(o.next_evolution[i].name);
            }
            contentForDisplay = pokemons;
        }
    });

    if (pokemons.length > 0) {
        response.send(pokemons);
    } else {
        response.send(404, `Could not find next evolution information for ${ request.params.name }`);
    }
}


// ===================================
// Routes
// ===================================
app.get('/', homeRequestHandler);
app.get('/:name', getPokemonByNameRequestHandler);
app.get('/type/:someType', getPokemonByTypeRequestHandler);
app.get('/weaknesses/:someWeakness', getPokemonByWeaknessRequestHandler);
app.get('/prevevolution/:name', getPokemonPreEvolutionRequestHandler);
app.get('/nextevolution/:name', getPokemonNextEvolutionRequestHandler);


// ===================================
// Start Server
// ===================================
startServer();