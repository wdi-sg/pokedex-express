const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const express = require('express');
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

//http://localhost:3000/search?q=bananas => You are search for bananas



// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

app.get("/", (request, response) => {
    response.send("Welcome to the online Pokedex!");
});

app.get("/:name", (request, response) => {

        let search = request.params.name;

        jsonfile.readFile(file, (err, obj) => {

            let pokedex = obj.pokemon;

            for (i = 0; i < pokedex.length; i++) {
                if (pokedex[i].name.toLowerCase() == search) {
                response.send(
                    `<html>
                        <body>
                            <p>This is <img src = ` +pokedex[i].img+ `></p>
                            <p>He weighs ` +pokedex[i].weight+ `.</p>
                            <p>He is a `+pokedex[i].type+` type pokemon.</p>
                        </body>
                        </html>`
                    );
                } else if (err) {
                    response.sendStatus(404);
                    response.send("Could not find information about " + search + " - Is that a new pokemon? Gotta catch em' all!");
                }
            }
    });
});

app.get("/type/:some_type", (request, response) => {

        let search = request.params.some_type;

        let sameType = [];

        jsonfile.readFile(file, (err, obj) => {

            let pokedex = obj.pokemon;

            for (i = 0; i < pokedex.length; i++) {
                for (j = 0; j < pokedex[i].type.length; j++) {
                    if (pokedex[i].type[j].toLowerCase() == search) {
                    sameType.push(pokedex[i].name);
                    } else if (err) {
                        response.sendStatus(404);
                        response.send("Could not find information about " + search + " - Is that a new pokemon? Gotta catch em' all!");
                    }
                }
            }response.send(sameType.join(','));
    });
});

app.get("/weakness/:some_weakness", (request, response) => {

        let search = request.params.some_weakness;

        let sameWeakness = [];

        jsonfile.readFile(file, (err, obj) => {

            let pokedex = obj.pokemon;

            for (i = 0; i < pokedex.length; i++) {
                for (j = 0; j < pokedex[i].weaknesses.length; j++) {
                    if (pokedex[i].weaknesses[j].toLowerCase() == search) {
                    sameWeakness.push(pokedex[i].name);
                    } else if (err) {
                        response.sendStatus(404);
                        response.send("Could not find information about " + search + " - Is that a new pokemon? Gotta catch em' all!");
                    }
                }
            }response.send(sameWeakness.join(','));
    });
});

app.get("/nextevolution/:preform", (request, response) => {

        let search = request.params.preform;

        let final = [];

        jsonfile.readFile(file, (err, obj) => {

            let pokedex = obj.pokemon;

            for (i = 0; i < pokedex.length; i++) {
                if (pokedex[i].next_evolution !== undefined) {
                    for (j = 0; j < pokedex[i].next_evolution.length; j++) {
                        if (pokedex[i].next_evolution[j].name.toLowerCase() == search) {
                            final.push(pokedex[i].name);
                        } else if (err) {
                        response.sendStatus(404);
                        response.send("Could not find information about " + search + " - Is that a new pokemon? Gotta catch em' all!");
                        } else {
                            response.send("No pokemons evolve from " + search + ".")
                        }
                    }
                }
            } response.send(final.join(','));
        })
    });


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
