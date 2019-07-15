const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

//to capture empty path
app.get('/', (request, response) => {
    response.send("Welcome to the online Pokedex!");
})

//Use to uppercase first letter and lower case all other letters for any string input
var capitalizeString = function(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

//to capture pokemon name (not case-sensitive)
app.get('/pokemon/:pokemon', (request, response) => {
    let selectedPokemon = capitalizeString(request.params['pokemon']);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let found = false;
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].name === selectedPokemon) {
                    let pok = obj.pokemon[i];
                    response.send(`
                        <h2>${pok.name}</h2>
                        <img src="${pok.img}">
                        <ul>
                        <li>Type : ${pok.type}</li>
                        <li>Height : ${pok.height}</li>
                        <li>Weight : ${pok.weight}</li>
                        <li>Weaknesses : ${pok.weaknesses}</li>
                        </ul>`);
                    found = true;
                    break;
                }
            }
            if (!found) {
                response.status(404).send(`Could not find information about ${selectedPokemon} - Is that a new pokemon? Gotta catch em' all!`);

            }
        };
    })
})

//capture pokemon type (not case-sensitive)
app.get('/type/:type', (request, response) => {

    let selectedType = capitalizeString(request.params['type']);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let found = false;
            let result = "";
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].type.includes(selectedType)) {
                    result += `<li>${obj.pokemon[i].name}</li>`
                    found = true;
                }
            }
            if (!found) {
                response.status(404).send(`Could not find information about ${selectedType} - Is that a new type? Gotta catch em' all!`);
            } else {
                response.send(`<h2>Pokemon of type : ${selectedType}</h2><ul>${result}</ul>`);
            }
        };
    })
})

//capture pokemon weaknesses (not case-sensitive)
app.get('/weaknesses/:weaknesses', (request, response) => {

    let selectedWeakness = capitalizeString(request.params['weaknesses']);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let found = false;
            let result = "";
            for (let i = 0; i < obj.pokemon.length; i++) {
                if (obj.pokemon[i].weaknesses.includes(selectedWeakness)) {
                    result += `<li>${obj.pokemon[i].name}</li>`
                    found = true;
                }
            }
            if (!found) {
                response.status(404).send(`Could not find information about ${selectedWeakness} - Is that a new weakness? Gotta catch em' all!`);
            } else {
                response.send(`<h2>Pokemon that are weak against : ${selectedWeakness}</h2><ul>${result}</ul>`);
            }
        };
    })
})

//capture pokemon previous evolutions (not case-sensitive)
app.get('/nextevolution/:pokemon', (request, response) => {

    let selectedPokemon = capitalizeString(request.params['pokemon']);

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let found = false;
            let result = "";
            for (let i = 0; i < obj.pokemon.length; i++) {

                if (obj.pokemon[i].name === selectedPokemon) {

                    let pok = obj.pokemon[i];
                    let result = "";

                    if (!("prev_evolution" in pok)) {
                        result = "<li>none</li>";
                    } else {
                        for (let i = 0; i < pok.prev_evolution.length; i++) {
                            result += `<li>${pok.prev_evolution[i].name}</li>`
                        }
                    }
                    response.send(`
                        <h2>${pok.name}</h2>
                        <img src="${pok.img}">
                        <h3>Evolves from :</h3>
                        <ul>${result}</ul>`);
                    found = true;
                    break;

                }
            }

            if (!found) {
                response.status(404).send(`Could not find information about ${selectedPokemon} - Is that a new pokemon? Gotta catch em' all!`);
            }

        };
    })
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));