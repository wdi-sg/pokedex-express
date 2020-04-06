/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
// Init express app
const express = require('express');
const app = express();

// Init jsonfile package
const jsonfile = require('jsonfile');
const file = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

var capsFirstLetter = function(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

////////////////////////////////////////////////////////////////////////////////////////////

app.get('/pokemon/:name', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let pokemonFound = false;
        let result = "";

        // console.log(obj.pokemon[0].name);
        for(let i=0; i<obj.pokemon.length-1; i++){
            if(request.params.name === obj.pokemon[i].name.toLowerCase()){
                pokemonFound=true;
                response.send(
                    `<h1>${obj.pokemon[i].name}</h1>
                    <img src="${obj.pokemon[i].img}">
                    <h3>Weight: ${obj.pokemon[i].weight}</h3>
                    <h3>Type: ${obj.pokemon[i].type} </h3>
                    `);
            }
        }

        if(!pokemonFound){
        //console.log(err)
        response.status(404);
        response.send(
            `<h2>Could not find information about ${request.params.name}.</h2>
            <h1>Is that a new pokemon? Gotta catch em' all!</h1>
            `);
        }
    })
});
//////////////////////////////////////////////////////////////////////////////////////////

app.get('/type/:type', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let typeFound = false;
        let result = "";
        let typeName = capsFirstLetter(request.params.type);

        // console.log(obj.pokemon[0].name);
        for(let i=0; i<obj.pokemon.length-1; i++){

            if(obj.pokemon[i].type.includes(typeName)){
                typeFound=true;
                result += `<li>${obj.pokemon[i].name}</li>`;
            }

        }

        if (!typeFound) {
            response.status(404);
            response.send(`<h2>Could not find information about ${typeName}<h2>`);
        }
        else {
            response.send(`<h2>Pokemon of type : ${typeName}</h2><ul>${result}</ul>`);
        }
    })
});

//////////////////////////////////////////////////////////////////////////////////////////

app.get('/weaknesses/:weaknesses', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let weaknessesFound = false;
        let result = "";
        let weaknessesType = capsFirstLetter(request.params.weaknesses);

        // console.log(obj.pokemon[0].name);
        for(let i=0; i<obj.pokemon.length-1; i++){

            if(obj.pokemon[i].weaknesses.includes(weaknessesType)){
                weaknessesFound=true;
                result += `<li>${obj.pokemon[i].name}</li>`;
            }

        }

        if (!weaknessesFound) {
            response.status(404);
            response.send(`<h2>Could not find information about ${weaknessesType}<h2>`);
        }
        else {
            response.send(`<h2>Pokemons with weaknesses : ${weaknessesType}</h2><ul>${result}</ul>`);
        }
    })
});

//////////////////////////////////////////////////////////////////////////////////////////

app.get('/nextevolution/:name', (request, response) => {

    jsonfile.readFile(file, (err, obj) => {

        let nextevolutionFound = false;
        let result = "";
        let pokeName = capsFirstLetter(request.params.name);

        // console.log(obj.pokemon[0].name);
        for(let i=0; i<obj.pokemon.length-1; i++){

            if(obj.pokemon[i].name === pokeName){
                    let result = "";

                    if (obj.pokemon[i].prev_evolution === undefined) {
                        result = "<li>none</li>";
                    } else {
                        for (let j=0; j<obj.pokemon[i].prev_evolution.length; j++) {
                            result += `<li>${obj.pokemon[i].prev_evolution[j].name}</li>`
                        }
                    }
                    response.send(`
                        <h2>${obj.pokemon[i].name}</h2>
                        <img src="${obj.pokemon[i].img}">
                        <h3>Evolves from :</h3>
                        <ul>${result}</ul>`);
                    nextevolutionFound = true;
            }

        }

        if (!nextevolutionFound) {
            response.status(404);
            response.send(`<h2>Could not find information about ${pokeName}<h2>`);
        }
    })
});



//////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (request, response) => {
    response.send(
                `<html>
                <body>
                <h1>Welcome to the online Pokdex!</h1>
                </body>
                </html>`);
});






/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
