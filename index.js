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

        if(list === '') {

            response.redirect("/");

        } else {

            let html = `<html><head><title>All ${userRequest}</title><body><h1>All ${userRequest} Pokemons</h1><ul>${list}</ul></body></html>`

            response.send(html);

        }

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

        if (list === '') {

            response.redirect("/");

        } else {

            let html = `<html><head><title>Weakness To ${userRequest}</title><body><h1>All Pokemons With Weakness To ${userRequest} </h1><ul>${list}</ul></body></html>`

            response.send(html);

        }

    });



})

app.get('/nextevolution/:pokemon', (request, response) => {

    let userRequest = request.params.pokemon[0].toUpperCase() + request.params.pokemon.substring(1).toLowerCase();

    jsonfile.readFile(pokedex, (err, obj) => {

        let check = false;

        let html = `<html><head><title>All Evolutions</title><body>`

        for (let i = 0; i < obj['pokemon'].length; i++) {

            if (obj['pokemon'][i]['name'] === userRequest) {

                check = true;

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

        if (check === false) {

            response.redirect("/");

        } else {

            response.send(html);

        }



    })

})

app.get('/search/:search', (request, response) => {

    jsonfile.readFile(pokedex, (err, obj) => {

        if (request.params.search === 'spawn_chance') {

            let list = '';

            let userAmount = parseInt(request.query.amount);
            let moreOrLess = request.query.compare;

            for (let i = 0; i < obj['pokemon'].length; i++) {

                if (moreOrLess === 'more') {

                    if (obj['pokemon'][i]['spawn_chance'] > userAmount) {

                        list += `<li><a href="/${obj['pokemon'][i]['name']}">${obj['pokemon'][i]['name']}<a></li>`;
                    }

                } else if (moreOrLess === 'less') {

                    if (obj['pokemon'][i]['spawn_chance'] < userAmount) {

                        list += `<li>${obj['pokemon'][i]['name']}</li>`
                    }

                }
            }

            let html = `<html><head><title>Spawn Chance</title></head><body><h1>List of Pokemon with ${request.params.search} ${moreOrLess} than ${userAmount}</h1><ul>${list}</ul></body></html>`

            response.send(html);
        }





    });


});



app.get('*', (request, response) => {

    let pathRoute = request.path.split('/')[1];

    if (pathRoute === '') {

        jsonfile.readFile(pokedex, (err, obj) => {


            let list = '';

            for (let i = 0; i < obj['pokemon'].length; i++) {

                list += `<li><a href="/${obj['pokemon'][i]['name']}">${obj['pokemon'][i]['name']}</a></li>`;
            }

            let html = `<html><head><title>Contents</title></head><body><h1>List Of Pokemons</h1><ul>${list}</ul></body></html>`

            response.send(html);

        })

    } else {

        let userRequest = pathRoute[0].toUpperCase() + pathRoute.substring(1).toLowerCase();
        var check = false;

        jsonfile.readFile(pokedex, (err, obj) => {

            for (let i = 0; i < obj['pokemon'].length; i++) {

                if (obj['pokemon'][i]['name'] === userRequest) {

                    var searchedPokemon = obj['pokemon'][i];
                    check = true;
                }
            }

            if(check === false) {

                response.redirect("/");

            } else {


                let html = `<html><head><title>${userRequest}</title><body><h1>${userRequest}</h1><img src=${searchedPokemon.img}>`

                for (let att in searchedPokemon) {

                    if (Array.isArray(searchedPokemon[att])) {

                        html += `<p>${att}: </p><ul>`;

                        for (let i = 0; i < searchedPokemon[att].length; i++) {

                            if ( typeof searchedPokemon[att][i] !== null && typeof searchedPokemon[att][i] === 'object') {

                                html += `<li>${searchedPokemon[att][i]['name']}</li>`;

                            } else {

                                html += `<li>${searchedPokemon[att][i]}</li>`;

                            }
                        }

                        html += `</ul>`

                    } else {

                        if (att !== "img" && att !== "name") {

                            html += `<p>${att}: ${searchedPokemon[att]}</p>`;
                        }

                    }
                }

                html += `</body</html>`;

                response.send(html);

            }
        })
    }

})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




