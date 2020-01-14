const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

const pokemonInfo = (request, response) => {

    let pokemonObject = request.params.name;

    jsonfile.readFile(file, (err, obj) => {
        let pokeInfo = obj["pokemon"];
        if(err === null){
        for(let i = 0; i < pokeInfo.length; i++){
            if(pokeInfo[i].name === pokemonObject){
                response.send(`
                    <p> ${pokeInfo[i].name} </p>
                    <p> <img src="${pokeInfo[i].img}"> </p>
                    <p> Height is : ${pokeInfo[i].height} </p>
                    <p> Weight is : ${pokeInfo[i].weight} </p>
                    <p> Candy is : ${pokeInfo[i].candy} </p>
                    <p> Spawn chance is : ${pokeInfo[i].spawn_chance} </p>`
                    );
                return;
                }
            }
        }
        response.status(404).send(`Could not find information about ${pokemonObject} - Is that a new pokemon? Gotta catch em' all!`)
    });
 };

const mainMenu = (request,response) => {
    response.send("Welcome to the online Pokedex")
}

const typeOfPokemon = (request,response) => {
    jsonfile.readFile(file, (err, obj) => {
        let pokeInfo = obj["pokemon"];
        let pokemonTypes = [];
        for(let i = 0; i < pokeInfo.length; i++){
            for(let j = 0; j < pokeInfo[i].type.length; j++)
            if(pokeInfo[i].type[j] === request.params.pokeTypes){
                pokemonTypes.push(pokeInfo[i].name)
                }
            }
            response.send(pokemonTypes);
        });
    };


app.get('/pokemon/:name', pokemonInfo);
app.get('/', mainMenu);
app.get('/type/:pokeTypes', typeOfPokemon);


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));