//===================================
// Configurations and set up
//===================================
const express = require('express');
const jsonfile = require('jsonfile');

const app = express();
const file = 'pokedex.json';


// ===================================
// Request Handlers
// ===================================
var homeRequestHandler = function (request, response) {
    let contentForDisplay = `Welcome to the online Pokdex!`;
    response.send(contentForDisplay);
}

var getPokemonByNameRequestHandler = function (request, response) {
    jsonfile.readFile(file, (err, data) => {
        let found = false;
        let contentForDisplay = `Could not find information about ${ request.params.name } - Is that a new pokemon? Gotta catch em' all!`;

        data.pokemon.forEach(function(item) {
            if (item.name.toLowerCase() === request.params.name.toLowerCase()) {
                found = true;
                contentForDisplay = `This is ${ item.name }, he is ${ item.weight } in weight! <br>
                He is also a ${ item.type } type pokemon.`
            }
        });

        if (found === true) {
            response.send(contentForDisplay);
        } else if (found === false) {
            response.send(404, contentForDisplay);
        }
    });
}

var getPokemonByTypeRequestHandler = function (request, response) {
    jsonfile.readFile(file, (err, data) => {
        let temp = [];
        let found = false;
        let contentForDisplay = `Could not find information about ${ request.params.someType } - Is that a new type?`;

        data.pokemon.forEach(function(item) {
            for (let i = 0; i < item.type.length; i++) {
                if (item.type[i].toLowerCase() === request.params.someType.toLowerCase()) {
                    found = true;
                    temp.push(item.name);
                }
            }
            contentForDisplay = temp;
        });

        if (found === true) {
            response.send(200, contentForDisplay);
        } else if (found === false) {
            response.send(404, contentForDisplay);
        }
    });
}

var getPokemonByWeaknessRequestHandler = function (request, response) {
    jsonfile.readFile(file, (err, data) => {
        let temp = [];
        let found = false;
        let contentForDisplay = `Could not find information about ${ request.params.someWeakness } - Is that a new weakness?`;

        data.pokemon.forEach(function(item) {
            for (let i = 0; i < item.weaknesses.length; i++) {
                if (item.weaknesses[i].toLowerCase() === request.params.someWeakness.toLowerCase()) {
                    found = true;
                    temp.push(item.name);
                }
            }
            contentForDisplay = temp;
        });

        if (found === true) {
            response.send(200, contentForDisplay);
        } else if (found === false) {
            response.send(404, contentForDisplay);
        }
    });
}

var getPokemonPreEvolutionRequestHandler = function (request, response) {
    jsonfile.readFile(file, (err, data) => {
        let temp = [];
        let found = false;
        let contentForDisplay = `Could not find previous evolution information for ${ request.params.name }`;

        data.pokemon.forEach(function(item) {
            if (item.name.toLowerCase() === request.params.name.toLowerCase() && "prev_evolution" in item) {
                found = true;

                for (let i = 0; i < item.prev_evolution.length; i++) {
                    temp.push(item.prev_evolution[i].name);
                }

                contentForDisplay = temp;
            }
        });

        if (found === true) {
            response.send(200, contentForDisplay);
        } else if (found === false) {
            response.send(404, contentForDisplay);
        }
    });
}

var getPokemonNextEvolutionRequestHandler = function (request, response) {
    jsonfile.readFile(file, (err, data) => {
        let temp = [];
        let found = false;
        let contentForDisplay = `Could not find next evolution information for ${ request.params.name }`;

        data.pokemon.forEach(function(item) {
            if (item.name.toLowerCase() === request.params.name.toLowerCase() && "next_evolution" in item) {
                found = true;

                for (let i = 0; i < item.next_evolution.length; i++) {
                    temp.push(item.next_evolution[i].name);
                }

                contentForDisplay = temp;
            }
        });

        if (found === true) {
            response.send(200, contentForDisplay);
        } else if (found === false) {
            response.send(404, contentForDisplay);
        }
    });
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
// Listen to requests on port 3000
// ===================================
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));