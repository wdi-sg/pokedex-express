const express = require('express');

const jsonfile = require('jsonfile');

const app = express();

app.get('/type/*', (request, response) => {

    // Get the type of pokemon queries
    var type = request.path.split('/type/');
    console.log(type);
    var type = type[1];
    var input = type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();

    jsonfile.readFile('pokedex.json', (err,obj) => {
        const pokemon = obj.pokemon;

        var list = "";

        // Creating a list of Pokemon with the matching type
        for ( let i = 0; i < pokemon.length; i++ ) {
            for ( let j = 0; j < 2; j++ ) {
                if ( input == pokemon[i].type[j] ) {
                    let pokes = '<li>' + pokemon[i].name + '</li>';
                    list = list + pokes;
                };
            };
        };

        let page = '<html><body><h1>';
        page = page + input;
        page = page + '</h1><ul>';
        page = page + list;
        page = page + '</ul></body></html>';

        response.send(page);
        console.log(input);
    });
});




//   const PATH = request.path;
//   // Getting rid of the '/'
//   var requestFromUser = request.path;
//   var nameSearch = requestFromUser.replace('/','');

//   jsonfile.readFile('pokedex.json', (err,obj) => {
//     // Sourcing list of Pokemons
//     const pokemon = obj.pokemon;

//     function getPokemonName() {
//         for ( let i = 0; i < pokemon.length; i++ ) {
//             let name = pokemon[i].name;
//             if ( name.toLowerCase() == nameSearch.toLowerCase() ) {
//                 return name;
//             };
//         };
//     };

//     function getDescription() {
//         for ( let i = 0; i < pokemon.length; i++ ) {
//             let name = pokemon[i].name;
//             if ( name.toLowerCase() == nameSearch.toLowerCase() ) {
//                 let pokemonWeight = pokemon[i].weight;
//                 return pokemonWeight;
//             };
//         };
//     };

//     var pokemonName = getPokemonName();

//     var pokemonWeight = getDescription();

//     function makePage(name, weight) {
//         let heading = '<h1>' + name + '</h1>';
//         let description = '<ul>' + "Weight: " + weight + "</ul>"
//         let page = '<html><body>' + heading + description + '</body></html>';
//         return page;
//     }

//     function invalidPokemon() {
//         let description = '<p>' + "Could not find information about " + nameSearch + ". Is that a new Pokemon? Gotta catch em' all!" + '</p>';
//         let page = '<html><body>' + description + '</body></html>';
//         return page;
//     };

//     function welcome() {
//         let description = '<h1>Welcome to the online Pokedex!</h1>';
//         let page = '<html><body>' + description + '</body></html>';
//         return page;
//     }

//     if ( getPokemonName() != undefined ) {
//         response.send(makePage(pokemonName, pokemonWeight));
//     } else if ( request.path == "/" || request.path == "" ) {
//         response.send(welcome());
//     } else {
//         response.status(404);
//         response.send(invalidPokemon());
//     }

//   });

// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
