const express = require('express');
const jsonfile = require('jsonfile');
const pokData = 'pokedex.json';


var pokemonArray;
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
app.get('/', (request,response) => {
    response.send("Welcome to the online Pokdex!");
});

app.get('/pokemon/:some_name', (request, response) => {
    const namepok = request.params.some_name
    console.log(namepok);
        jsonfile.readFile(pokData, (err, obj) => {
            for (var i = 0; i < obj["pokemon"].length; i++) {
                pokemonArray = obj["pokemon"][i]
            if(namepok === pokemonArray["name"]){
                var chosenPoke;
                chosenPoke = pokemonArray;
                }
            }
            if (chosenPoke !== undefined){
                response.send(
                    `<h1>${chosenPoke["name"]}</h1><br>
                    <img src = ${chosenPoke["img"]}>
                    <p>${chosenPoke["type"]}</p>
                    <p>${chosenPoke["height"]}</p>
                    <p>${chosenPoke["weight"]}</p>
                    <p>${chosenPoke["candy"]}</p>
                    <p>${chosenPoke["candy_count"]}</p>
                    <p>${chosenPoke["egg"]}</p>
                    <p>${chosenPoke["spawn_chance"]}</p>
                    <p>${chosenPoke["avg_spawns"]}</p>
                    <p>${chosenPoke["multipliers"]}</p>
                    <p>${chosenPoke["weaknesses"]}</p>
                    `)
            } else {
                        response.status(404).send(`${namepok} - Is that a new pokemon? Gotta catch em' all!`);
                    }
    });
});

app.get('/type/:some_type', (request, response) => {
    const elem = request.params.some_type
    console.log(elem);
    var foundtype = [];
     jsonfile.readFile(pokData, (err, obj) => {
        for (var i = 0; i < obj["pokemon"].length; i++) {
            pokemonArray = obj["pokemon"][i]
            var pokeType = pokemonArray["type"]
            for (var j = 0; j < pokeType.length; j++) {
                if (pokeType[j] === elem) {
                    foundtype.push(pokemonArray["name"])
                }
            }
        }
    response.send(`<h1>Pokemon</h1>
        <p>with the same type </p>
        <p>${foundtype.join(", ")}</p>`)
     });
});

app.get('/weaknesses/:some_weakness', (request, response) => {
    const elem = request.params.some_weakness
    console.log(elem);
    var foundtype = [];
     jsonfile.readFile(pokData, (err, obj) => {
        for (var i = 0; i < obj["pokemon"].length; i++) {
            pokemonArray = obj["pokemon"][i]
            var pokeType = pokemonArray["weaknesses"]
            for (var j = 0; j < pokeType.length; j++) {
                if (pokeType[j] === elem) {
                    foundtype.push(pokemonArray["name"])
                }
            }
        }
    response.send(`<h1>Pokemon</h1>
        <p>with the same weaknesses</p>
        <p>${foundtype.join(", ")}</p>`)
     });
});

app.get('/nextevolution/:some_name', (request, response) => {
    const namepok = request.params.some_name
    // console.log(namepok);
    var foundtype = [];
     jsonfile.readFile(pokData, (err, obj) => {
        for (var i = 0; i < obj["pokemon"].length; i++) {
            pokemonArray = obj["pokemon"][i]
            if(namepok === pokemonArray["name"]){
                for (var j = 0; j < pokemonArray["prev_evolution"].length; j++) {
                     var chosenPoke = pokemonArray["prev_evolution"][j]
                    foundtype.push(chosenPoke["name"])
                }
            }
        } if(chosenPoke !== undefined){
            response.send(`<h1>Pokemon</h1>
            <p>which will evolve to ${namepok}</p>
            <p>${foundtype.join(", ")}</p>`)
        } else {
            response.status(404).send(`${namepok} - Is that a new pokemon? Gotta catch em' all!`);
        }
     });
});


// app.get('/pokemon/:id', (request, response) => {
//     const num = parseInt(request.params.id)
//     // console.log(num);
//         jsonfile.readFile(pokData, (err, obj) => {
//             for (var i = 0; i < obj["pokemon"].length; i++) {
//                 pokemonArray = obj["pokemon"][i]
//             if(num === pokemonArray["id"]){
//                 console.log(pokemonArray["id"]);
//                 response.send(pokemonArray["name"]);
//                 }
//             }
//     });
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));