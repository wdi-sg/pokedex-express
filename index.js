console.log("daily assignment again!!!");

const express = require('express');

// const jsonfile = require('jsonfile');
const jsonfile = require('jsonfile');

const file = "pokedex.json";

// test reading logic
// jsonfile.readFile(file, (err, obj) => {
//     if (err) {
//         console.log(err);
//     }
//     else {
//         console.log("obj.pokemon[0].weight: " + obj.pokemon[0].weight);
//     }
// });

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */








// Init express app

const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/pokemon/:name", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        var found = false;

        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
                    response.send(request.params.name + " stands at a height at " + obj.pokemon[i].height + " weighing at " + obj.pokemon[i].weight);
                    found = true;
                }
            }
            if (found === false){
                response.status(404).send("Could not find information about " + request.params.name + ". Is that a new pokemon?")
                // response.send("No infomation for " + request.params.name);
            }
        }
    })
});

// =========================================================

var typeArray = [];

app.get("/type/:type", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < obj.pokemon.length; i++) {

                for (let j = 0; j < obj.pokemon[i].type.length; j++) {

                    if (obj.pokemon[i].type[j].toLowerCase() === request.params.type.toLowerCase()) {
                        typeArray.push(obj.pokemon[i].name + "\n");
                    }
                }
            }
            response.send("The " + request.params.type + " pokemons are " + typeArray.toString());
        }
    })
});

// =========================================================

var weaknessesArray = [];

app.get("/weakness/:weaknesses", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < obj.pokemon.length; i++) {

                for (let j = 0; j < obj.pokemon[i].weaknesses.length; j++) {
                    if (obj.pokemon[i].weaknesses[j].toLowerCase() === request.params.weaknesses.toLowerCase()) {
                        weaknessesArray.push(obj.pokemon[i].name + "\n");
                    }
                }
            }
            response.send("The pokemons with " + request.params.weaknesses + " weakness are " + weaknessesArray);
        }
    })
})

// =========================================================

var evoArray = [];

app.get("/nextevolution/:name", (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err);
        }
        else {
            for (let i = 0; i < obj.pokemon.length; i++) {

                if (obj.pokemon[i].name === request.params.name && obj.pokemon[i].prev_evolution != undefined)  {

                    for (let j = 0; j < obj.pokemon[i].prev_evolution.length; j++) {

                        evoArray.push(obj.pokemon[i].prev_evolution[j].name);

                    }
                }
            }
            response.send("The prev_evolution for " + request.params.name + " is/are " + evoArray.toString());
        }
    })
});


// =========================================================

app.get("/", (request, response) => {
    response.send("Welcome to online pokedex")
});

// =========================================================



// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));