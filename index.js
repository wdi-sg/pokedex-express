const express = require('express');

const jsonfile = require('jsonfile');
const pokedex = 'pokedex.json';

// Init express app
const app = express();
const allTypes = ['Normal', 'Fire', 'Water', 'Electric', 'Grass', 'Ice', 'Fighting', 'Poison', 'Ground', 'Flying', 'Psychic', 'Bug', 'Rock', 'Ghost', 'Dragon', 'Dark', 'Steel', 'Fairy'];

app.get('/', (request, response) => {
    response.send('Hello! Go to ../pokemon for more.');
});

app.get('/pokemon', (request, response) => {
    response.send("Welcome to the online Pokedex!\n Start by entering a number like so : pokemon/2");
});

app.get("/pokemon/:name", (request, response) => {
    const readPokedex = (err, obj) => {
        let pokemonCount = obj.pokemon.length;
        let pokeName = request.params.name;
        pokeName = pokeName.substring(0, 1).toUpperCase() + pokeName.substring(1).toLowerCase();
        for (let i = 0; i < pokemonCount; i++) {
            if (obj.pokemon[i].name == pokeName) {
                let pokeWeight = obj.pokemon[i].weight;
                let pokeHeight = obj.pokemon[i].height;
                let pokeImage = obj.pokemon[i].img;
                response.send(`<img src = ${pokeImage}> <div>You have chosen ${pokeName}! It weight ${pokeWeight} and is ${pokeHeight} tall!</div>`)
            }
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`Could not find information about ${pokeName} - Is that a new pokemon? Gotta catch em' all!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readPokedex);
    console.log("file read called");
});

app.get("/type/:typeName", (request, response) => {
    const readType = (err, obj) => {
        let pokemonList = [];
        let pokemonCount = obj.pokemon.length;
        let pokeType = request.params.typeName;
        pokeType = pokeType.substring(0, 1).toUpperCase() + pokeType.substring(1).toLowerCase();
        for (let i = 0; i < allTypes.length; i++) {
            if (pokeType == allTypes[i]) {
                for (let j = 0; j < pokemonCount; j++) {
                    for (let k = 0; k < obj.pokemon[j].type.length; k++) {
                        if (obj.pokemon[j].type[k] == pokeType) {
                            pokemonList.push(`<li>${obj.pokemon[j].name}</li>`)
                        }
                    }
                }
                pokemonList = pokemonList.join('');
                response.send(`You have chosen ${pokeType} and the following pokemon has ${pokeType} as its type. \n ${pokemonList}`)
            }
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`${pokeType} is not a valid type!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readType);
    console.log("file read called");
});

app.get("/weakness/:weakness", (request, response) => {
    const readType = (err, obj) => {
        let pokemonList = [];
        let pokemonCount = obj.pokemon.length;
        let pokeWeakness = request.params.weakness;
        pokeWeakness = pokeWeakness.substring(0, 1).toUpperCase() + pokeWeakness.substring(1).toLowerCase();
        for (let i = 0; i < allTypes.length; i++) {
            if (pokeWeakness == allTypes[i]) {
                for (let j = 0; j < pokemonCount; j++) {
                    for (let k = 0; k < obj.pokemon[j].weaknesses.length; k++) {
                        if (obj.pokemon[j].weaknesses[k] == pokeWeakness) {
                            pokemonList.push(`<li>${obj.pokemon[j].name}</li>`)
                        }
                    }
                }
                response.send(`You have chosen ${pokeWeakness} and the following pokemon are weak to ${pokeWeakness }. \n ${pokemonList}`)
            }
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`${pokeWeakness} is not a valid type!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readType);
    console.log("file read called");
});

app.get("/nextevolution/:name", (request, response) => {
    const readType = (err, obj) => {
        let pokemonList = [];
        let pokemonCount = obj.pokemon.length;
        let pokeName = request.params.name;
        pokeName = pokeName.substring(0, 1).toUpperCase() + pokeName.substring(1).toLowerCase();
        for (let i = 0; i < pokemonCount; i++) {
            if (obj.pokemon[i].name == pokeName) {
                if (obj.pokemon[i].next_evolution) {
                    for (let j = 0; j < obj.pokemon[i].next_evolution.length; j++) {
                        pokemonList.push(`<li>${obj.pokemon[i].next_evolution[j].name}</li>`)
                    }
                } else {
                    response.send(`${pokeName} does not have an evolution!`)
                    return;
                }
            }
        }
        if(pokemonList.length > 0){
            response.send(`You have chosen ${pokeName} its next evolutions are: \n ${pokemonList}`)
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`Could not find information about ${pokeName}!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readType);
    console.log("file read called");
});

app.get("/prevevolution/:name", (request, response) => {
    const readType = (err, obj) => {
        let pokemonList = [];
        let pokemonCount = obj.pokemon.length;
        let pokeName = request.params.name;
        pokeName = pokeName.substring(0, 1).toUpperCase() + pokeName.substring(1).toLowerCase();
        for (let i = 0; i < pokemonCount; i++) {
            if (obj.pokemon[i].name == pokeName) {
                if (obj.pokemon[i].prev_evolution) {
                    for (let j = 0; j < obj.pokemon[i].prev_evolution.length; j++) {
                        pokemonList.push(`<li>${obj.pokemon[i].prev_evolution[j].name}</li>`)
                    }
                } else {
                    response.send(`${pokeName} does not have an previous evolution!`)
                    return;
                }
            }
        }
        if(pokemonList.length > 0){
            response.send(`You have chosen ${pokeName} its previous evolution(s) are: \n ${pokemonList}`)
        }
        const doneReading = (err) => {
            response.status(404)
            response.send(`Could not find information about ${pokeName}!`)
        }
        jsonfile.writeFile(pokedex, obj, doneReading)
    };

    jsonfile.readFile(pokedex, readType);
    console.log("file read called");
});

// app.get('*', (request, response) => {
// send response with some data (a string)
//     response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));