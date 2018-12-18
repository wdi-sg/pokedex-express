/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';


// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get("/name/:x", (request, response) => {
    var name  = request.params.x;
    var weight;
    var nameFound = false;
    jsonfile.readFile(file, function (err, obj) {
        for(var i = 0; i < obj.pokemon.length; i++ ) {
            if(obj.pokemon[i].name.toLowerCase() === name.toLowerCase()) {
                weight = obj.pokemon[i].weight;
                nameFound = true;
                break;
            }
        }

        if (nameFound) {
        response.send("The weight of pokemon with name " + obj.pokemon[i].name + " is " + weight);
        }

        else {
        response.send("No such pokemon with name " + name);
        }
    })
})

app.get("/type/:x", (request, response) => {
    var type  = request.params.x;
    var list = [];
    var message = "";
    jsonfile.readFile(file, function (err, obj) {
        for(var i = 0; i < obj.pokemon.length; i++ ) {
            for (var j = 0; j < obj.pokemon[i].type.length; j++) {
                if (obj.pokemon[i].type[j].toLowerCase() === type.toLowerCase()){
                    list.push(obj.pokemon[i].name);
                    break;
                }
            }
        }
        if (list.length > 0) {
            message = "The list of pokemon with type " + type + ": " + "</br>";
            for (var k = 0; k < list.length; k++) {
                message = message + "-" + list[k] + ", " + "</br>";
            }
            response.send(message);
        }

        else {
            response.send("There is no pokemon with type " + type + ".");
        }
    })
})

app.get("/weakness/:x", (request, response) => {
    var weakness  = request.params.x;
    var list = [];
    var message = "";
    jsonfile.readFile(file, function (err, obj) {
        for(var i = 0; i < obj.pokemon.length; i++ ) {
            for (var j = 0; j < obj.pokemon[i].weaknesses.length; j++) {
                if (obj.pokemon[i].weaknesses[j].toLowerCase() === weakness.toLowerCase()){
                    list.push(obj.pokemon[i].name);
                    break;
                }
            }
        }
        if (list.length > 0) {
            message = "The list of pokemon with weakness " + weakness  + ": " + "</br>";
            for (var k = 0; k < list.length; k++) {
                message = message + "-"+ list[k] + "</br>";
            }
            response.send(message);
        }

        else {
            response.send("There is no pokemon with weakness " + weakness + ".");
        }
    })
})

app.get("/nextevolution/:x", (request, response) => {
    var nextEvolution  = request.params.x;
    var listWithNextEvo = [];
    var list = [];
    var message = "";
    jsonfile.readFile(file, function (err, obj) {
        for(var i = 0; i < obj.pokemon.length; i++ ) {
            for (var property in obj.pokemon[i]) {
                if (property === "next_evolution") {
                    listWithNextEvo.push(obj.pokemon[i]);
                    break;
                }
            }
        }

        for(var i = 0; i < listWithNextEvo.length; i++ ) {
            for (var j = 0; j < listWithNextEvo[i].next_evolution.length; j++) {
                if (listWithNextEvo[i].next_evolution[j].name.toLowerCase() === nextEvolution.toLowerCase()){
                    list.push(listWithNextEvo[i].name);
                    break;
                }
            }
        }

        if (list.length > 0) {
            message = "The list of pokemon with next evolution " + nextEvolution  + ": " + "</br>";
            for (var k = 0; k < list.length; k++) {
                message = message + "-"+ list[k] + "</br>";
            }
            response.send(message);
        }

        else {
            response.send("There is no pokemon with next evolution " + nextEvolution + ".");
        }
    })
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
