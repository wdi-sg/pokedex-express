const express = require('express');
const jsonfile = require('jsonfile');

// create a new express app
const app = express();

//Question 1: Go through pokedex.json to understand how the data is structured. Where are all the pokemon data stored?
// when referencing a file, consider -> ./ or ../ or ./foldername
const pokedex = './pokedex.json';

//create a page at the root route / that displays links to each pokemon's page.
    //(hint: the html is created in a loop)
        const convertToHTML = function(array) {
            let html = '<html>';
            let header = `<h1 style="font-size:20px">Pokemon Index</h1>`
            let body = '<body>';
            let div = '<div style="list-style-type:circle; list-style-position:inside;text-align:left">';
            let ul = '<ul>';
                for (i in array) {
                    //is this equal to appendChild?
                    var nameOfPokemon = array[i].toLowerCase();
                    ul += `<li><a href="./${nameOfPokemon}">${array[i]}</a></li>`;
                }
            let close = '</ul></div></body></html>';

            // Concatenate all strings into one
            let complete = html + header + body + div + ul + close;
            // console.log(complete);
                //Return the complete string
            return complete;
        }

//if the user requests a pokemon or something that doesn't exist, redirect them back to the root URL.

var pokemonIndex = [];
app.get('/', (request, response) => {
    jsonfile.readFile(pokedex, function(error, object) {
        //create object
        for (key in object.pokemon) {
            var pokemonName = object.pokemon[key].name;
            pokemonIndex.push(pokemonName);
        }
        response.send(convertToHTML(pokemonIndex));
    })

})

        //create a function that can format the results in HTML
        const formatResultsInHTML = function(title, pokemon) {
            let html = '<html>';
            let body = '<body>';
            let header = `<h1>${title}</h1>`;
            let div = '<div>';
            let ul = '<ul style="list-style-type:circle; list-style-position:inside; padding-left:20vw; padding-right:20vw; text-align:center">';
            // FILL <div> with information from Pokemon array using for loop
            // console.log(pokemon); - POKEMON IS UNDEFINED
            for (key in pokemon) { //understand basics
                if (key === 'img') {
                    var pokemonImage = pokemon['img']; //WHY DO YOU NEED THE ' '?
                    div += `<img src="${pokemonImage}" style="padding:10px;display:block;margin: 0px auto 0px auto;">`+ '<br>';
                }
                else if (key === 'prev_evolution' || key === 'next_evolution') {
                    ul += `<li>${key}:</li> <br>`;
                    //loop through the various previous spawns
                    // console.log(pokemon['prev_evolution']);
                    var pokemonEvolution = pokemon[key];
                    for (j in pokemonEvolution) {
                        var pokemonEvolutionSpecies = pokemonEvolution[j];
                            for (k in pokemonEvolutionSpecies) {
                                ul += `<li>${k}: ${pokemonEvolutionSpecies[k]}</li>`+ '<br>';
                            }
                        console.log(pokemonEvolutionSpecies);
                    }
                } else {
                    var keyName = key.charAt(0).toUpperCase() + key.slice(1)
                    ul += `<li> ${keyName}: ${pokemon[key]}</li>`+ '<br>';
                }
            }
            let close = '</ul></div></body></html>';

            // Concatenate all strings into one
            let complete = html + body + header + div + ul + close;
            // console.log(complete);
            //Return the complete string
            return complete;
        }


//Question 2: Return a string response with the requested pokemon's information when a request comes with matching the route
app.get('*', (request, response) => {
    var path = request.path.substring(1);
    var check = false;
    //start by reading the pokedex json file, object can be named anything
    jsonfile.readFile(pokedex, function(error, object) {

        //and then sending it in the response of the request
        for (key in object.pokemon) {
            var pokemonName = object.pokemon[key].name.toLowerCase();
            if (path.includes(pokemonName)) {
                //Further Q3: Instead of showing just the weight, show all the details of the requested pokemon for /some-name route, in a full sentence. i.e., "This is Bublasaur, he is 45kg in weight! He also..." etc., etc
                // response.send(`This is ${object.pokemon[i].name}, he is ${object.pokemon[i].weight} in weight! His weaknesses are ${object.pokemon[i].weaknesses}`)
                // response.send(object.pokemon[i]);
                response.send(formatResultsInHTML(object.pokemon[key].name,object.pokemon[key]));
                check = true;
            }
        }
        if (check == false) {
            //redirect ppl to home page if they type something wrongly
            response.status(404).redirect('/');
        }
    })
})


//run this command to ready your server, by specifying a port to listen on, and you are listening for a request
//console.log to make sure you know your server is up and running
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

//TO FIGURE OUT LATER:
//Create a route for each of these: spawn_chance, avg_spawns that will show each pokemon that is more or less than the given number.
//Example: /search/spawn_chance?amount=1&compare=less will send back a formatted HTML page with a list of every pokemon with a spawn change less than 1.
//Example 2: /search/avg_spawn?amount=0.8&compare=more

// const searchPokemon = (param, amt, cmp, pokedex) => {
//   if (amt !== undefined && cmp === 'more') {
//     const payload = [];
//     Object.keys(pokedex).forEach((key) => {
//       if (pokedex[key][param] > amt) payload.push(pokedex[key].name);
//     });
//     return payload;
//   }
//   if (amt !== undefined && cmp === 'less') {
//     const payload = [];
//     Object.keys(pokedex).forEach((key) => {
//       if (pokedex[key][param] < amt) payload.push(pokedex[key].name);
//     });
//     return payload;
//   }
//   return 'This should not happen.';
// };

// app.get('/search/:parameter',(request,response) => {
//         const parameter = request.params.parameter;
//         // console.log(request.params.parameter)
//         const amount = request.query.amount;
//         const compare = request.query.compare;

//         response.send("hi")
// })

//     app.get('/search/:parameter', (request, response) => {
//       const param = request.params.parameter;
//       const amt = request.query.amount;
//       const cmp = request.query.compare;
//       res.send(generatePokemonList(`${capitalize(param).replace('_', ' ')} ${cmp} than ${amt}`, searchPokemon(param, amt, cmp, pokedex)));
//     });
