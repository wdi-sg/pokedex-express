const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const file = './pokedex.json';
// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon', (request, response) => {
    response.send("Welcome to the online Pokdex!");
});

app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);
        let pokeName = request.params.name;
        console.log(pokeName)
        let foundPoke;
        for (let i=0; i<obj["pokemon"].length; i++) {
            if (obj["pokemon"][i]["name"] === pokeName) {
                foundPoke = obj["pokemon"][i];
            };
        };
        if (foundPoke === undefined) {
// Set the status code to 404.
            response.status(404).send(`Could not find information about ${pokeName} - Is that a new pokemon? Gotta catch em' all!`);
        } else {
// send response with some data (a string)
            response.send(
                `
                    This is ${foundPoke["name"]}.
                    It is ${foundPoke["type"]}.
                    It is ${foundPoke["height"]}.
                    It is ${foundPoke["weight"]}.
                    It is ${foundPoke["weaknesses"]}.
                `
            );

        }
    })
});

app.get('/pokemon/type/:type', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);
        let pokeType = request.params.type;
        let foundPoke = [];
        for (let i=0; i<obj["pokemon"].length; i++) {
            if (obj["pokemon"][i]["type"].includes(pokeType)) {
                foundPoke.push(obj["pokemon"][i]["name"]);
            };
        };
        response.send(foundPoke);
    })
});

app.get('/pokemon/weaknesses/:weakness', (request, response) => {
    jsonfile.readFile(file, function (err, obj) {
        if (err) console.error(err);
        let pokeWeakness = request.params.weakness;
        let foundPoke = [];
        for (let i=0; i<obj["pokemon"].length; i++) {
            if (obj["pokemon"][i]["weaknesses"].includes(pokeWeakness)) {
                foundPoke.push(obj["pokemon"][i]["name"]);
            };
        };
        response.send(foundPoke);
    })
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));