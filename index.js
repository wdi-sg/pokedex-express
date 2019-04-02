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

            app.get("/nextevolution/:Pokemon", (request, response) => {

                jsonfile.readFile(file, (err, obj) => {

                    let Pokemon = request.params.Pokemon;
                    let pokemonsWithNextEvolutionArray = [];
                    let pokemonsWithNextEvolutionNameArray = [];
                    let parentPokemonArray = [];
                    let parentPokemonStringList = "";

                    for(let i=0; i<obj.pokemon.length; i++) {
                        if(obj.pokemon[i].next_evolution !== undefined) {
                            pokemonsWithNextEvolutionArray.push(obj.pokemon[i]);
                            pokemonsWithNextEvolutionNameArray.push(obj.pokemon[i].name.toLowerCase());
                        }
                    }

                    if(pokemonsWithNextEvolutionNameArray.includes(Pokemon.toLowerCase()) == false) {
                                response.send(`${Pokemon} does not evolved into anything, it is in its final form, please try another pokemon`);
                                return;
                            } else if(pokemonsWithNextEvolutionNameArray.includes(Pokemon.toLowerCase()) == true) {
                                for(let j=0; j<pokemonsWithNextEvolutionArray.length; j++) {
                                    for(let k=0; k<pokemonsWithNextEvolutionArray[j].next_evolution.length; k++) {
                                        if( Pokemon.toLowerCase() === pokemonsWithNextEvolutionArray[j].name.toLowerCase()) {
                                            parentPokemonArray.push(pokemonsWithNextEvolutionArray[j].next_evolution[k]);
                                        }
                                    }
                                }

                                for(let i=0; i<parentPokemonArray.length; i++) {
                                    parentPokemonStringList = parentPokemonStringList + " " + parentPokemonArray[i].name;
                                }
                            }




                response.send(`<html><body><p>The list of pokemons which ${Pokemon} can evolved to are :<p><br><p>${parentPokemonStringList}</p></body></html>`)

            });

            });



            app.get("/prevevolution/:Pokemon", (request, response) => {

                jsonfile.readFile(file, (err, obj) => {

                    let Pokemon = request.params.Pokemon;
                    let pokemonsWithPreviousEvolutionArray = [];
                    let pokemonsWithPrevioustEvolutionNameArray = [];
                    let childPokemonArray = [];
                    let childPokemonStringList = "";

                    for(let i=0; i<obj.pokemon.length; i++) {
                        if(obj.pokemon[i].prev_evolution !== undefined) {
                            pokemonsWithPreviousEvolutionArray.push(obj.pokemon[i]);
                            pokemonsWithPrevioustEvolutionNameArray.push(obj.pokemon[i].name.toLowerCase());
                        }
                    }

                    if(pokemonsWithPrevioustEvolutionNameArray.includes(Pokemon.toLowerCase()) == false) {
                                response.send(`${Pokemon} is in its basic form, it has no previous evolution state, please try another pokemon`);
                                return;
                            } else if(pokemonsWithPrevioustEvolutionNameArray.includes(Pokemon.toLowerCase()) == true) {
                                for(let j=0; j<pokemonsWithPreviousEvolutionArray.length; j++) {
                                    for(let k=0; k<pokemonsWithPreviousEvolutionArray[j].prev_evolution.length; k++) {
                                        if( Pokemon.toLowerCase() === pokemonsWithPreviousEvolutionArray[j].name.toLowerCase()) {
                                            childPokemonArray.push(pokemonsWithPreviousEvolutionArray[j].prev_evolution[k]);
                                        }
                                    }
                                }

                                for(let i=0; i<childPokemonArray.length; i++) {
                                    childPokemonStringList = childPokemonStringList + " " + childPokemonArray[i].name;
                                }
                            }




                response.send(`<html><body><p>The list of pokemons which ${Pokemon} evolved from are :<p><br><p>${childPokemonStringList}</p></body></html>`)

            });

            });



            app.get("/weakness/:inputWeakness", (request, response) => {

              jsonfile.readFile(file, (err, obj) => {

                let inputWeakness = request.params.inputWeakness;
                let weaknessesPokemonArray = [];

                for(let i=0; i<obj.pokemon.length; i++) {
                    for(let j=0; j<obj.pokemon[i].weaknesses.length; j++) {
                        if(inputWeakness.toLowerCase() === obj.pokemon[i].weaknesses[j].toLowerCase()) {
                            weaknessesPokemonArray.push(obj.pokemon[i].name);
                        }
                    }
                }

                 response.send(`<html><body><p>The list of pokemons with weaknesses of ${inputWeakness} are:<p><br><p>${weaknessesPokemonArray}</p></body></html>`);


            });

            });



             app.get("/type/:inputType", (request, response) => {

              jsonfile.readFile(file, (err, obj) => {

                let inputType = request.params.inputType;
                let typedPokemonArray = [];

                for(let i=0; i<obj.pokemon.length; i++) {
                    for(let j=0; j<obj.pokemon[i].type.length; j++) {
                        if(inputType.toLowerCase() === obj.pokemon[i].type[j].toLowerCase()) {
                            typedPokemonArray.push(obj.pokemon[i].name);
                        }
                    }
                }

                // response.send(`The list of pokemons of type ${inputType} are: ${typedPokemonArray}`);

                 response.send(`<html><body><p>The list of pokemons of type ${inputType} are:<p><br><p>${typedPokemonArray}</p></body></html>`);


            });

            });



 app.get("/:pokemon", (request, response) => {

  jsonfile.readFile(file, (err, obj) => {

    let pokemonInput = request.params.pokemon
    let selectedPokemonWeight = "";
    let selectedPokemonHeight = "";
    let selectedPokemonType = [];
    let selectedPokemonWeakness = [];
    let flag = false;

//scan through the entire list of pokemons to see if any one of them matches the input pokemon appended in the url
for(let i=0; i<obj.pokemon.length; i++) {
    let eachPokemon = obj.pokemon[i].name;
    if(pokemonInput.toLowerCase() !== eachPokemon.toLowerCase()) {
        flag = false;
    }
}

//loop through the entire list of pokemons to see if any of them matches the input pokemon, if so, assigned the weight variable with the matched pokemon's weight
for(let i=0; i<obj.pokemon.length; i++) {
    let eachPokemon = obj.pokemon[i].name;
    if(pokemonInput.toLowerCase() === eachPokemon.toLowerCase()) {
        flag = true;
        selectedPokemonWeight = obj.pokemon[i].weight;
        selectedPokemonHeight = obj.pokemon[i].height;
        for(let j=0; j<obj.pokemon[i].type.length; j++) {
            selectedPokemonType.push(obj.pokemon[i].type[j]);
        }

        for(let k=0; k<obj.pokemon[i].weaknesses.length; k++) {
            selectedPokemonWeakness.push(obj.pokemon[i].weaknesses[k]);
        }


    }

}

if(flag === true) {
 response.send(`This is ${pokemonInput}, he is ${selectedPokemonWeight} in weight, ${selectedPokemonWeight} in height and is of type ${selectedPokemonType} and has weaknesses to ${selectedPokemonWeakness}`);
} else if(flag === false) {
    response.send(404, `Could not find information about ${pokemonInput} - Is that a new pokemon? Gotta catch em' all!`);
}




});



});


 app.get('*', (request, response) => {
  // send response with some data (a string)
  // response.send(request.path);
  response.send("Welcome to the online Pokedex!");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));