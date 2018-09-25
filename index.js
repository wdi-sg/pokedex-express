const express = require('express');
const jsonfile = require('jsonfile');

const file = 'pokedex.json'

const app = express();

var results

var handleRequest = (request, response) => {
    jsonfile.readFile(file, function(err, obj) {
        var route = request.path
        var routeSplit = route.split('/')

        // search for type
        if (routeSplit[1] === 'type') {
            results = searchForType(obj, routeSplit[2]);
            response.send(results);
        }
        // search for weakness
        else if (routeSplit[1] === 'weakness'){
            results = searchForWeakness(obj, routeSplit[2]);
            response.send(results);
        }
        // search for rev
        else if (routeSplit[1] === 'nextevolution'){
            results = searchForNextRev(obj, routeSplit[2]);
            response.send(results);
        }
        // landing page
        else if (request.path === '/' ){
            response.send('<html><body><h1>Welcome to Pokedex</h1></body></html>');
            response.status( 404 );
        }
        // search by name
        else if (routeSplit.length === 2){
        route = route.replace('/', '');
        results = searchByName(obj, route)

        if (err){
            console.log(err);
        }

        else{
            if( results === 'notFound' ){
            response.send(`Could not find information about ${route} - Is that a new pokemon? Gotta catch em' all!`)
            }
            else{
            response.send(results);
            }
        }
    }
    });
}

var searchByName = (obj, name) => {
    const pokemons = obj.pokemon;
    for (var i = 0; i < pokemons.length; i++) {
        if (name.toLowerCase() === pokemons[i].name.toLowerCase()) {
            //var string= pokemons[i].name + pokemons[i].weight;
            return `This is ${pokemons[i].name}, he is ${pokemons[i].weight} in weight and ${pokemons[i].height} in height! He also a ${pokemons[i].type[0]} type pokemon.`
        }
    }
    return 'notFound'
}


var searchForType = (obj, poketype) => {
    const pokemons = obj.pokemon;
    var arr = []
    for (var i = 0; i < pokemons.length; i++) {
        for (var j = 0; j < pokemons[i].type.length; j++) {
            if (poketype === pokemons[i].type[j].toLowerCase()) {
                arr.push(pokemons[i].name)
            }
        }
    }
    return arr
}

var searchForWeakness = (obj, pokeWeakness) => {
    const pokemons = obj.pokemon;
    var arr = []
    for (var i = 0; i < pokemons.length; i++) {
        for (var j = 0; j < pokemons[i].weaknesses.length; j++) {
            if (pokeWeakness === pokemons[i].weaknesses[j].toLowerCase()) {
                arr.push(pokemons[i].name)
            }
        }
    }
    return arr
}

var searchForNextRev = (obj, rev) => {
    const pokemons = obj.pokemon;
    var arr =[]
    for (var i =0; i<pokemons.length; i ++){
        if (pokemons[i].prev_evolution !== undefined && pokemons[i].name.toLowerCase() === rev){
            for (var j =0; j<pokemons[i].prev_evolution.length; j++){
                arr.push(pokemons[i].prev_evolution[j].name)
            }
        }
    }
    return arr
}



app.get('*', handleRequest);

const PORT_NUM = 3000;

app.listen(PORT_NUM);