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
//
app.get('/pokedex/:name', (request, response) => {

    jsonfile.readFile(file, (err, list)=>{
        let pokemonFound = false;
        for(let i = 0; i<list.pokemon.length; i++){
            if(list.pokemon[i].name.toLowerCase() === request.params.name ){
                pokemonFound = true;
                response.send('"This is ' + list.pokemon[i].name + ', ' + 'he is ' +list.pokemon[i].weight + ' in weight! His weaknesses are ' + list.pokemon[i].weaknesses[0] + ', ' + list.pokemon[i].weaknesses[1]  + ', ' + list.pokemon[i].weaknesses[2] + '.')
            }
        }
        if(!pokemonFound){
            response.send(404, 'Is that a new pokemon? Gotta catch em\' all!\" (replace <pokemon_name> with the requested for pokemon name)');

        }
    })
});

app.get('/pokedex', (request, response) => {
    response.send('Welcome to the online Pokdex!');
});

app.get('/type/:someType', (request, response) => {

    var inputType = request.params.someType.charAt(0).toUpperCase() + request.params.someType.slice(1);
        jsonfile.readFile(file, (err, list)=>{
            var listType =[];
            for(let i = 0; i<list.pokemon.length; i++){
                if(list.pokemon[i].type.includes(inputType) > 0){
                    listType.push(list.pokemon[i].name);
                }
            }
            if(listType.length > 0){
                response.send(listType);
            } else {
                response.send(404, 'Does this type exist? Do you even pokemon? (replace <pokemon_type> with an actual pokemon type. And we will get you a list of what you have requested).')
            }
    });
});

app.get('/weaknesses/:someWeakness', (request, response) => {

    var inputType = request.params.someWeakness.charAt(0).toUpperCase() + request.params.someWeakness.slice(1);
        jsonfile.readFile(file, (err, list)=>{
            var listType =[];
            for(let i = 0; i<list.pokemon.length; i++){
                if(list.pokemon[i].weaknesses.includes(inputType) > 0){
                    listType.push(list.pokemon[i].name);
                }
            }
            if(listType.length > 0){
                response.send(listType);
            } else {
                response.send(404, 'Does this type exist? Do you even pokemon? (replace <pokemon_type> with an actual pokemon weakness. And we will get you a list of what you have requested).')
            }
    });
});

app.get('/nextevolution/:someEvolution', (request, response) => {

    var inputType = request.params.someEvolution.charAt(0).toUpperCase() + request.params.someEvolution.slice(1);
        jsonfile.readFile(file, (err, list)=>{
            var listType =[];
            for(let i = 0; i<list.pokemon.length; i++){
                if(list.pokemon[i].name.includes(inputType) > 0){
                    listType.push(list.pokemon[i].prev_evolution);
                }
            }
            if(listType.length > 0){
                response.send(listType);
            } else {
                response.send(404, 'Pokemon is the lowest scrub-form. Or does not have evolve from other forms. Please request again.')
            }
    });
});
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));