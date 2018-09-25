const express = require('express');

const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

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

app.get('/type/:type', (request, response) => {

    let userRequest = request.params.type[0].toUpperCase() + request.params.type.substring(1).toLowerCase();

    jsonfile.readFile(pokedex, (err,obj) => {

        let list = ""

        for (let i = 0; i < obj['pokemon'].length; i++) {

            if (obj['pokemon'][i]['type'].includes(userRequest)) {

                list += `<li>${obj['pokemon'][i]['name']}</li>`;

            }

        }

        let html = `<html><head><title>All ${userRequest}</title><body><h1>All ${userRequest} Pokemons</h1><ul>${list}</ul></body></html>`

        response.send(html)

    });


});


app.get('/weakness/:type', (request, response) => {


    let userRequest = request.params.type[0].toUpperCase() + request.params.type.substring(1).toLowerCase();

    jsonfile.readFile(pokedex, (err,obj) => {

        let list = ""

        for (let i = 0; i < obj['pokemon'].length; i++) {

            if (obj['pokemon'][i]['weaknesses'].includes(userRequest)) {

                list += `<li>${obj['pokemon'][i]['name']}</li>`;

            }

        }

        let html = `<html><head><title>Weakness To ${userRequest}</title><body><h1>All Pokemons With Weakness To ${userRequest} </h1><ul>${list}</ul></body></html>`

        response.send(html)

    });



})

app.get('/nextevolution/:pokemon', (request, response) => {

    let userRequest = request.params.pokemon[0].toUpperCase() + request.params.pokemon.substring(1).toLowerCase();

    jsonfile.readFile(pokedex, (err, obj) => {

        let html = `<html><head><title>All Evolutions</title><body>`

        for (let i = 0; i < obj['pokemon'].length; i++) {

            if (obj['pokemon'][i]['name'] === userRequest) {

                html += `<h1>${obj['pokemon'][i]['name']}</h1><img src=${obj['pokemon'][i]["img"]}>`;

                if (obj['pokemon'][i]['prev_evolution'] !== undefined ) {

                    html += `<h2>Previous Evolutions</h2><ul>`;

                    for (let j = 0; j < obj['pokemon'][i]['prev_evolution'].length; j++) {

                        html += `<li>${obj['pokemon'][i]['prev_evolution'][j]['name']}</li>`;
                    }

                    html += `</ul>`;
                }

                if (obj['pokemon'][i]['next_evolution'] !== undefined ) {

                    html += `<h2>Next Evolutions</h2><ul>`;

                    for (let j = 0; j < obj['pokemon'][i]['next_evolution'].length; j++) {

                        html += `<li>${obj['pokemon'][i]['next_evolution'][j]['name']}</li>`;
                    }

                    html += `<ul>`;
                }
            }
        }

        html += `</body></html>`;

        response.send(html);

    })

})

app.get('*', (err, response) => {











})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




