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

 // Expose a new route for /nextevolution/some-name that returns a message listing the names of all pokemon that the pokemon evolves from (eg. /nextevolution/charizard).

            // app.get("/nextevolution/:Pokemon", (request, response) => {

            //     jsonfile.readFile(file, (err, obj) => {

            //         let Pokemon = request.params.Pokemon;
            //         let parentPokemonArray = [];

            //         console.log(obj.pokemon[0].next_evolution.length);

            //         for(let i=0; i<obj.pokemon.length; i++) {
            //             for(let j=0; j<obj.pokemon[i].next_evolution.length; j++) {
            //                 if(Pokemon.toLowerCase() === obj.pokemon[i].next_evolution[j].name.toLowerCase()) {
            //                     parentPokemonArray.push(obj.pokemon[i].name);
            //                 }
            //             }
            //         }

            //     response.send(`<html><body><p>The list of pokemons which evolved from ${Pokemon} are:<p><br><p>${parentPokemonArray}</p></body></html>`)

            // });

            // });



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

//assignment
// app.get("/pokemon/:number", (request, response) => {

//   let pokemonNumber = request.params.number;


//   //jsonfile.readFile()
//   // when you read the file, get the specific pokemon that is being requested

//   //response.send(pokemon that was requested);
// });