const express = require('express');

const jsonfile = require('jsonfile');

const app = express();

app.get('*', (request, response) => {
  // send response with some data (a string)
  // response.send("<input id='input'><button id='button'></button>");

  const PATH = request.path;
  // Getting rid of the '/'
  var requestFromUser = request.path;
  var nameSearch = requestFromUser.replace('/','');

  jsonfile.readFile('pokedex.json', (err,obj) => {
    // Sourcing list of Pokemons
    const pokemon = obj.pokemon;

    function getPokemonName() {
        for ( let i = 0; i < pokemon.length; i++ ) {
            let name = pokemon[i].name;
            if ( name.toLowerCase() == nameSearch.toLowerCase() ) {
                return name;
            };
        };
    };

    function getDescription() {
        for ( let i = 0; i < pokemon.length; i++ ) {
            let name = pokemon[i].name;
            if ( name.toLowerCase() == nameSearch.toLowerCase() ) {
                let pokemonWeight = pokemon[i].weight;
                return pokemonWeight;
            };
        };
    };

    var pokemonName = getPokemonName();

    var pokemonWeight = getDescription();

    function makePage(name, weight) {
        let heading = '<h1>' + name + '</h1>';
        let description = '<ul>' + "Weight: " + weight + "</ul>"
        let page = '<html><body>' + heading + description + '</body></html>';
        return page;
    }

    function invalidPokemon() {
        let description = '<p>' + "Could not find information about " + nameSearch + ". Is that a new Pokemon? Gotta catch em' all!" + '</p>';
        let page = '<html><body>' + description + '</body></html>';
        return page;
    };

    function welcome() {
        let description = '<h1>Welcome to the online Pokedex!</h1>';
        let page = '<html><body>' + description + '</body></html>';
        return page;
    }

    if ( getPokemonName() != undefined ) {
        response.send(makePage(pokemonName, pokemonWeight));
    } else if ( request.path == "/" || request.path == "" ) {
        response.send(welcome());
    } else {
        response.status(404);
        response.send(invalidPokemon());
    }

  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
