const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();

app.get('/', (request, response) => {
    response.send("Welcome to the online Pokedex!");
})

var name = function(str) {
    return str[0].toUpperCase() + str.substring(1).toLowerCase();
}

//getting pokemon name
app.get('/pokemon/:pokemon', (request, response) => {
    let selectedPokemon = name(request.params['pokemon']);

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
                }
            }
            if (!found) {
                response.status(404).send(`Could not find information about ${selectedPokemon} - Is that a new pokemon? Gotta catch em' all!`);

            }
        };
    })
})

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));