var json = require("./pokedex.json");
const express = require('express');
const app = express();
const jsonfile = require('jsonfile');



app.get('/bulbasaur', (request, response) => {
    let bulbasaurWeight = json['pokemon'][0]['weight']
  response.send(`The Bulbasaur weight is ${bulbasaurWeight}`);
}); //BASIC 1

// app.get('/404', (request, response) => {
//   response.send(404, "ERRORRRR");
// }); //FURTHER 1

app.get('', (request, response) => {
  response.send(`Welcome to the online pokedex!`);
}); //FURTHER 2

app.get('/:pokemon', (request, response) => {

// let pokemonData = json['pokemon'][i]['name'].toLowerCase();
let pokemonSearch = request.params.pokemon.toLowerCase();
console.log(pokemonSearch);

    for (i = 0; i < json['pokemon'].length; i++) {
        if (json['pokemon'][i]['name'].toLowerCase() === pokemonSearch) {
            let name = json['pokemon'][i]['name'];
            let type = json['pokemon'][i]['type'];
            let weight = json['pokemon'][i]['weight'];
            let height = json['pokemon'][i]['height'];

            response.send(`This is ${name} who is ${type} type. It is ${height} tall and weighs ${weight}.`);
            console.log('sending data');
        }
    }

    response.send("POKEMON NOT FOUND!")

}); //FURTHER 3 + 1


app.get('/type/:type', (request, response) => {

let pokemonSearch = request.params.type.toLowerCase();
// console.log(pokemonSearch);
    let array = [];
    for (i = 0; i < json['pokemon'].length; i++) {
        let pokemonType = json.pokemon[i].type.toString().toLowerCase();
        // console.log(pokemonType);
        if (pokemonType.includes(pokemonSearch)) {
            array.push(json.pokemon[i].name);
            // console.log(array);

        }

    }
            response.send(array)

}); //FURTHER 4




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

// let pokeArray = [];
// pokeArray.push("HELLO");
// pokeArray.push("Bye");
// console.log(pokeArray);

// console.log(json['pokemon'][13]['type']);
// console.log('testing');
// console.log(json['pokemon'][0]['type'][0].toLowerCase());