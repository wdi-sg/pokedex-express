const express = require('express');

const jsonfile = require('jsonfile');

const app = express();


app.get('/search/:param', (request, response) => {
    console.log('request param:', request.params)
    console.log('request query:', request.query)

    let param = request.params.param;
    console.log(param);

    console.log(request.query.amount);
    let amount = request.query.amount
    console.log(amount);

    let direction = request.query.compare;
    console.log(direction);


    let title = "Finding " + param + " with amount of " + amount + " and " + direction


    jsonfile.readFile('pokedex.json', (err,obj) => {

        var list = "";

        if ( direction == "more" ) {
            for ( var i = 0; i < obj.pokemon.length; i++ ) {
                if ( obj.pokemon[i][param] > amount ) {
                    let pokes = '<li>' + obj.pokemon[i].name + '</li>';
                    list = list + pokes;
                };
            };
        };
        if ( direction == "less" ) {
            for ( var i = 0; i < obj.pokemon.length; i++ ) {
                if ( obj.pokemon[i][param] < amount ) {
                    let pokes = '<li>' + obj.pokemon[i].name + '</li>';
                    list = list + pokes;
                };
            };
        };

        console.log(list)
        let page = '<html><body><h1>';
        page = page + title;
        page = page + '</h1><ul>';
        page = page + list;
        page = page + '</ul></body></html>';

        response.send(page);

    });
});


app.get('/type/:something', (request, response) => {

    // Get the type of pokemon queries
    var type = request.path.split('/type/');

    // type = ["","Grass"];
    // type = type[1]

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
                    let pokes = '<li>' + pokemon[i].name + ' ' + pokemon[i].param + '</li>';
                    list = list + pokes;
                };
            };
        };

        let page = '<html><body><h1>';
        page = page + input
        page = page + '</h1><ul>';
        page = page + list;
        page = page + '</ul></body></html>';

        response.send(page);
        console.log(input);
    });
});



app.get('*', (request, response) => {

    console.log(request.path);

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
            if ( name.toLowerCase().replace(/\s/g, '') == nameSearch.toLowerCase().replace(/\s/g, '') ) {
                return name;
            };
        };
    };

    function getDescription() {
        for ( let i = 0; i < pokemon.length; i++ ) {
            let name = pokemon[i].name;
            if ( name.toLowerCase().replace(/\s/g, '') == nameSearch.toLowerCase().replace(/\s/g, '') ) {
                let pokemonWeight = pokemon[i].weight;
                return pokemonWeight;
            };
        };
    };

    function getImage() {
        for ( let i = 0; i < pokemon.length; i++ ) {
            let name = pokemon[i].name;
            if ( name.toLowerCase().replace(/\s/g, '') == nameSearch.toLowerCase().replace(/\s/g, '') ) {
                let pokemonImage = pokemon[i].img;
                return pokemonImage;
            };
        };
    };

    function getNext() {
        for ( let i = 0; i < pokemon.length; i++ ) {
            let name = pokemon[i].name;
            if ( name.toLowerCase() == nameSearch.toLowerCase() ) {
                if ( pokemon[i].id < 151 ) {
                    var nextPokeName = pokemon[i+1].name;
                    return nextPokeName;
                };
            };
        };
    };

    var pokemonName = getPokemonName();

    var pokemonWeight = getDescription();

    var pokemonImage = getImage();

    var nextPoke = getNext();

    function makePage(name, weight, imageLink, next) {
        let heading = '<h1>' + name + '</h1>';
        let description = '<ul>' + "Weight: " + weight + "</ul>"
        let image = '<img src="' + imageLink + '">';
        let nextDude = '<a href="/' + next + '">Next Pokemon</a>';
        let page = '<html><body>' + heading + description + image + nextDude + '</body></html>';
        return page;
    }

    function invalidPokemon() {
        let description = '<p>' + "Could not find information about " + nameSearch + ". Is that a new Pokemon? Gotta catch em' all!" + '</p>';
        let page = '<html><body>' + description + '</body></html>';
        return page;
    };


    function welcome() {
        let description = '<h1>Welcome to the online Pokedex!</h1>';

        let pokeList = "";

        for ( var i = 0; i < obj.pokemon.length; i++ ) {
            let pokes = '<li style="color: orange"><a href="/' + obj.pokemon[i].name.replace(/\s/g, '') + '">' + obj.pokemon[i].name.replace(/\s/g, '') + '</a></li>';
            pokeList += pokes;
        }

        var page = '<html><body><h1>' + description + '</h1>' + '<ul>' + pokeList + '</ul>';
        page += '</body></html>'

        return page;
    }

    if ( getPokemonName() != undefined ) {
        response.send(makePage(pokemonName, pokemonWeight, pokemonImage, nextPoke));
    } else if ( request.path == "/" || request.path == "" ) {
        response.send(welcome());
    } else {
        response.status(404);
        response.redirect('http://127.0.0.1:3000/');
    }

  });

});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
