const express = require('express');

const jsonfile = require('jsonfile');

const file = "pokedex.json";

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


jsonfile.readFile(file, (err, obj) => {


    // number of Pokemons
    var count = 0;
    obj.pokemon.forEach(x => {
        count++;
    });
    // console.log(count);


    // default
    app.get('', (request, response) => {
        response.send("Welcome to the online Pokedex!");
    });


    // search by Pokemon name
    app.get("/:name", (request, response) => {
        var currentPokemon = request.params.name;
        var foundPoke = false;


        for (var i = 0; i < count; i++) {
            if (obj.pokemon[i].name.toLowerCase() === currentPokemon) {
                // print weight of pokemon
                var niceCurrentPokemon = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
                response.send(`This is ${niceCurrentPokemon}, rolling with a height of ${obj.pokemon[i].height} and weight of ${obj.pokemon[i].weight}. Being a ${Object.values(obj.pokemon[i].type)} pokemon, its weaknesses include ${Object.values(obj.pokemon[i].weaknesses)} power(s).`);

                foundPoke = true;
                break;
            }
        }


        // if pokemon not fonund, display error message 404
        if (!foundPoke) {
            var niceCurrentPokemon = currentPokemon.charAt(0).toUpperCase() + currentPokemon.slice(1);
            response.status(404).send(`Could not find information on ${niceCurrentPokemon}. Is that a new pokemon? Gotta catch em' all!`);
        }
    });


    // search by type of Pokemon
    app.get('/type/:type', (request, response) => {
        var currentType = request.params.type;
        var niceCurrentType = currentType.charAt(0).toUpperCase() + currentType.slice(1);

        var typeList = `List of ${niceCurrentType} Pokemons: <br>`;

        for (var j = 0; j < count; j++) {
            console.log(Object.values(obj.pokemon[j].type));
            for (var n = 0; n < Object.values(obj.pokemon[j].type).length; n++) {

                console.log(obj.pokemon[j].type[n].toLowerCase());
                if (obj.pokemon[j].type[k].toLowerCase() === currentType) {
                    var niceCurrentPokemon = obj.pokemon[j].name.charAt(0).toUpperCase() + obj.pokemon[j].name.slice(1);
                    typeList += "- " + niceCurrentPokemon + "<br>";
                }
            }
        }
        console.log(typeList);
        response.send(typeList);
    });


    // search by Pokemon's weaknesses
    app.get('/weaknesses/:weakness', (request, response) => {
        var currentWeakness = request.params.weakness;
        console.log(currentWeakness);
        var niceCurrentWeakness = currentWeakness.charAt(0).toUpperCase() + currentWeakness.slice(1);

        var weaknessList = `List of Pokemons with ${niceCurrentWeakness} as its weakness: <br> `;

        for (var m = 0; m < count; m++) {
            console.log(Object.values(obj.pokemon[m].weaknesses));
            for (var n = 0; n < Object.values(obj.pokemon[m].weaknesses).length; n++) {

                console.log(obj.pokemon[m].weaknesses[n].toLowerCase());
                if (obj.pokemon[m].weaknesses[n].toLowerCase() === currentWeakness) {
                    var niceCurrentPokemon = obj.pokemon[m].name.charAt(0).toUpperCase() + obj.pokemon[m].name.slice(1);
                    weaknessList += "- " + niceCurrentPokemon + "<br>";
                }
            }
        }
        console.log(weaknessList);
        response.send(weaknessList);
    });


    // searches by Pokemon's next evolution
    app.get('/nextevolution/:name', (request, response) => {
        var currentName = request.params.name;
        console.log(currentName);
        var niceCurrentName = currentName.charAt(0).toUpperCase() + currentName.slice(1);

        var evolutionList = `List of ${niceCurrentName}'s previous evolutions: <br> `;
        var evolutionExist = false;

        for (var p = 0; p < count; p++) {
            if (obj.pokemon[p].name.toLowerCase() === currentName) {

                // to check it previous evolutions exist
                var arrayOfCharacteristics = Object.keys(obj.pokemon[p]);
                console.log(arrayOfCharacteristics);
                arrayOfCharacteristics.forEach(function (element) {
                    if (element === "prev_evolution") {
                        evolutionExist = true;
                    }
                });

                // only find for previous evolution if previous evolution index exists.
                if (evolutionExist) {
                    for (var q = 0; q < Object.values(obj.pokemon[p]["prev_evolution"]).length; q++) {
                        evolutionExist = true;
                        evolutionList += "- " + obj.pokemon[p]["prev_evolution"][q].name + "<br>";
                    }
                }
            }
        }

        // prints results accordindingly
        if (evolutionExist) {
            response.send(evolutionList);
        } else {
            response.send(`${niceCurrentName} has no previous evolutions. It'z a baby!`)
        }
    });
});




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
