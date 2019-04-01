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
    let contentForDisplay = `Welcome to the online Pokedex!`;
    response.send(contentForDisplay);
}

var getPokemonByNameRequestHandler = function (request, response) {
    let found = false;
    let contentForDisplay = `Could not find pokedex information about ${ request.params.name }.`;

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase()) {
            found = true;
            contentForDisplay = `This is ${ o.name }, he is ${ o.weight } in weight!`
        }
    });

    if (found === true) {
        response.send(contentForDisplay);
    } else if (found === false) {
        response.send(404, contentForDisplay);
    }
}

var getPokemonByTypeRequestHandler = function (request, response) {
    let temp = [];
    let found = false;
    let contentForDisplay = `Could not find type information about ${ request.params.someType }.`;

    _.forEach(data.pokemon, (o) => {
        for (let i = 0; i < o.type.length; i++) {
            if (o.type[i].toLowerCase() === request.params.someType.toLowerCase()) {
                found = true;
                temp.push(o.name);
            }
        }
        contentForDisplay = temp;
    });

    if (found === true) {
        response.send(contentForDisplay);
    } else {
        response.send(404, contentForDisplay);
    }
}

var getPokemonByWeaknessRequestHandler = function (request, response) {
    let temp = [];
    let found = false;
    let contentForDisplay = `Could not find weakness information about ${ request.params.someWeakness }.`;

    _.forEach(data.pokemon, (o) => {
        for (let i = 0; i < o.weaknesses.length; i++) {
            if (o.weaknesses[i].toLowerCase() === request.params.someWeakness.toLowerCase()) {
                found = true;
                temp.push(o.name);
            }
        }
        contentForDisplay = temp;
    });

    if (found === true) {
        response.send(contentForDisplay);
    } else {
        response.send(404, contentForDisplay);
    }
}

var getPokemonPreEvolutionRequestHandler = function (request, response) {
    let temp = [];
    let found = false;
    let contentForDisplay = `Could not find previous evolution information for ${ request.params.name }`;

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase() && "prev_evolution" in o) {
            for (let i = 0; i < o.prev_evolution.length; i++) {
                found = true;
                temp.push(o.prev_evolution[i].name);
            }
            contentForDisplay = temp;
        }
    });

    if (found === true) {
        response.send(contentForDisplay);
    } else {
        response.send(404, contentForDisplay);
    }
}

var getPokemonNextEvolutionRequestHandler = function (request, response) {
    let temp = [];
    let found = false;
    let contentForDisplay = `Could not find next evolution information for ${ request.params.name }`;

    _.forEach(data.pokemon, (o) => {
        if (o.name.toLowerCase() === request.params.name.toLowerCase() && "next_evolution" in o) {
            for (let i = 0; i < o.next_evolution.length; i++) {
                found = true;
                temp.push(o.next_evolution[i].name);
            }
            contentForDisplay = temp;
        }
    });

    if (found === true) {
        response.send(contentForDisplay);
    } else {
        response.send(404, contentForDisplay);
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