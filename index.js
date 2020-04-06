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


/**
 * ===================================
 * Routes
 * ===================================
 */


// app.get('/pokemon/:x', (request, response) => {
//     if(request.path == "/pokemon/"+request.params.x) {
//         jsonfile.readFile(file, (err, obj) => {
//             response.send(obj.pokemon[parseInt(request.params.x)].name);
//         });
//     }
// });

app.get('/pokemon/:name', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        var allPokemonName = [];

        for (let i = 0; i < obj.pokemon.length; i++) {
            allPokemonName.push(obj.pokemon[i].name.toLowerCase());
        };

        if (allPokemonName.indexOf(request.params.name.toLowerCase()) === -1) {
            response.send("Status: 404. Could not find information about " +request.params.name + " - Is that a new pokemon? Gotta catch em' all!");
        } else {
            for (let i = 0; i < obj.pokemon.length; i++){
                if (obj.pokemon[i].name.toLowerCase() === request.params.name.toLowerCase()) {
                    response.send("<h2 style='color: blue'>Pokemon Chosen</h2>" +
                        "Name: " + obj.pokemon[i].name + "<br>" +
                        "Weight: " + obj.pokemon[i].weight + "<br>" +
                        "Height: " + obj.pokemon[i].height + "<br>" +
                        "<img src='" + obj.pokemon[i].img + "'>" + "<br>" +
                        "Type: " + obj.pokemon[i].type
                        );
                };
            };
        };
    });
});

var allPokemonType = [];
const getAllPokemonType = () => {
    jsonfile.readFile(file, (err, obj) => {
        for (let i = 0; i < obj.pokemon.length; i++) {
            for (let j = 0; j < obj.pokemon[i].type.length; j++) {
                if (allPokemonType.indexOf(obj.pokemon[i].type[j]) === -1) {
                    allPokemonType.push(obj.pokemon[i].type[j]);
                };
            };
        };
        console.log(allPokemonType);
    });
};

getAllPokemonType();

app.get('/type/:type', (request, response) => {
    string = request.params.type.toLowerCase();
    checkType = string.charAt(0).toUpperCase() + string.slice(1);

    const getPokemonOfType = typeOfPokemon => {
        var allPokemonOfType = [];
        jsonfile.readFile(file, (err, obj) => {
            for (let j = 0; j < obj.pokemon.length; j++) {
                if (obj.pokemon[j].type.indexOf(typeOfPokemon) !== -1) {
                    allPokemonOfType.push(obj.pokemon[j].name);
                }
            }
            var allPokemonOfTypeList = allPokemonOfType.toString().split(",").join("<br>")
            response.send(allPokemonOfTypeList);
        });
    };

    if (checkType === "Grass") {
        getPokemonOfType("Grass");
    } else if (checkType === "Poison") {
        getPokemonOfType("Poison");
    } else if (checkType === "Fire") {
        getPokemonOfType("Fire");
    } else if (checkType === "Flying") {
        getPokemonOfType("Flying");
    } else if (checkType === "Water") {
        getPokemonOfType("Water");
    } else if (checkType === "Bug") {
        getPokemonOfType("Bug");
    } else if (checkType === "Normal") {
        getPokemonOfType("Normal");
    } else if (checkType === "Electric") {
        getPokemonOfType("Electric");
    } else if (checkType === "Ground") {
        getPokemonOfType("Ground");
    } else if (checkType === "Fighting") {
        getPokemonOfType("Fighting");
    } else if (checkType === "Psychic") {
        getPokemonOfType("Psychic");
    } else if (checkType === "Rock") {
        getPokemonOfType("Rock");
    } else if (checkType === "Ice") {
        getPokemonOfType("Ice");
    } else if (checkType === "Ghost") {
        getPokemonOfType("Ghost");
    } else if (checkType === "Dragon") {
        getPokemonOfType("Dragon");
    };
})

app.get('*', (request, response) => {
    if (request.path === "/pokemon/"+""){
        response.send("Welcome to the online Pokedex!");
    }

});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));