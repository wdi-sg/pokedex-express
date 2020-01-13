const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const dataFile = 'pokedex.json';

const pageHeader = (pageTitle) => {
    const pageHeaderContent = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <link rel="stylesheet" href="../style.css">
      <title>${pageTitle}</title>
  </head>
  <body>
      <div class="container">`;
    return pageHeaderContent;
}

const pageFooter = () => {
    const pageFooterContent = `</div>
  </body>
  </html>`;
    return pageFooterContent;
}

/**
 * ===================================
 * Functions
 * ===================================
 */

const displayPokemon = (request, response) => {
    console.log('displaying pokemon ' + request.params.name);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        }
        const pokemonArray = obj.pokemon;

        const requestName = request.params.name

        // If input is a number, display the pokemon by its number;
        if (parseInt(requestName)) {
            if (requestName >= 0 && requestName < pokemonArray.length) {
                response.send(returnPokemon(pokemonArray[requestName - 1]))
                return;
            }
        }

        // using for ... of loops. Much nicer than index search for this sort of thing.
        for (const pokemon of pokemonArray) {
            // console.log(`name: ${pokemon.name}, weight ${pokemon.weight}`);
            if (pokemon.name.toLowerCase() === requestName.toLowerCase()) {
                response.send(returnPokemon(pokemon));
                return;
            }
        }
        response.status(404).send(`${pageHeader('404 Error')}Could not find information about ${requestName} - Is that a new pokemon? Gotta catch em' all!${pageFooter()}`)
    })
}

// A dedicated function for returning information about a pokemon object, formatted in a HTML string.
const returnPokemon = (pokemon) => {
    const name = pokemon.name;
    const weight = pokemon.weight;
    const height = pokemon.height;
    let types = "";
    for (let i = 0; i < pokemon.type.length; i++) {
        // console.log(pokemon.type[i]);
        if (i === pokemon.type.length - 1) {
            types += `<a href="../type/${pokemon.type[i]}">${pokemon.type[i]}</a>`;
        } else {
            types += `<a href="../type/${pokemon.type[i]}">${pokemon.type[i]}</a>, `;
        }
    }
    let responseString = `${pageHeader(name)}<div class="display-4">${name}</div>
    <img class="img-fluid" src="${pokemon.img}">
    <p>Type: ${types}</p>
    <p>Height: ${pokemon.height}</p>
    <p>Weight: ${pokemon.weight}</p>${pageFooter()}`
    return responseString;
}


const displayIndexPage = () => {
    let responseString = `Welcome to the online Pokedex!`;
    return responseString;
}


const listByType = (request, response) => {
    console.log('listing of type: ' + request.params.inputType);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        };
        const pokemonArray = obj.pokemon;
        const inputType = request.params.inputType.toLowerCase();
        const resultsArray = [];

        for (const pokemon of pokemonArray) {
            for (const type of pokemon.type) {
                if (type.toLowerCase() === inputType) {
                    // console.log(`${pokemon.name} is of type ${type}.`)
                    resultsArray.push(pokemon);
                }
            }
        }

        // console.log(resultsArray);

        if (resultsArray.length === 0) {
            console.log('not found type')
            response.status(401).send(`${pageHeader()}<div class="display-4">Error, ${inputType} not found!</div>${pageFooter()}`);
            return;
        } else {
            let returnString = `<div class="display-4">${inputType} type</div><ul>`;
            for (const pokemon of resultsArray) {
                returnString += `<li><a href="../pokemon/${pokemon.name}">${pokemon.name}</a></li>`;
            }
            returnString += "</ul>"
            response.send(`${pageHeader(inputType + ' type')}${returnString}${pageFooter()}`);
            return;
        }
    })
}


const listByWeakness = (request, response) => {
    console.log('listing of type: ' + request.params.inputType);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        };
        const pokemonArray = obj.pokemon;
        const inputWeakness = request.params.inputWeakness.toLowerCase();
        const resultsArray = [];

        for (const pokemon of pokemonArray) {
            for (const weakness of pokemon.weaknesses) {
                if (weakness.toLowerCase() === inputWeakness) {
                    // console.log(`${pokemon.name} is weak to ${inputWeakness}.`)
                    resultsArray.push(pokemon);
                }
            }
        }

        // console.log(resultsArray);

        if (resultsArray.length === 0) {
            console.log('not found weakness')
            response.status(401).send(`${pageHeader('401 Error!')} Error, ${inputWeakness} not found!${pageFooter()}`);
            return;
        } else {
            let returnString = `<div class="display-4">Weak to ${inputWeakness}</div><ul>`;
            for (const pokemon of resultsArray) {
                returnString += `<li><a href="../pokemon/${pokemon.name}">${pokemon.name}</a></li>`;
            }
            returnString += "</ul>"
            response.send(`${pageHeader('Weak to ' + inputWeakness)}${returnString}${pageFooter()}`);
            return;
        }
    })
}


const listNextEvolution = (request, response) => {
    let isActuallyAPokemon = false;
    console.log('listing of type: ' + request.params.inputType);
    jsonfile.readFile(dataFile, (err, obj) => {
        if (err) {
            response.status(500).send('Error: ' + err);
            return;
        };
        const pokemonArray = obj.pokemon;
        const inputPokemonName = request.params.inputPokemonName.toLowerCase();
        const resultsArray = [];

        for (const pokemon of pokemonArray) {
            if (inputPokemonName === pokemon.name.toLowerCase()) {
                isActuallyAPokemon = true;
            }
            // console.log(pokemon.prev_evolution);
            if (pokemon.next_evolution) {
                for (const evolutions of pokemon.next_evolution) {
                    console.log(evolutions.name);
                    if (evolutions.name.toLowerCase() === inputPokemonName) {
                        resultsArray.push(pokemon);
                    }
                }
            }
        }

        // console.log(resultsArray);

        if (resultsArray.length === 0) {
            if (isActuallyAPokemon) {
                response.send(`${pageHeader('No previous evolutions')}${inputPokemonName} has no previous evolutions.${pageFooter()}`);
                return;
            }
            response.status(401).send(`${pageHeader('401 Error')}<div class="display-4">Error, ${inputPokemonName} is not a pokemon!</div>${pageFooter()}`);
            return;
        } else {
            let returnString = `<div class="display-4">${inputPokemonName} evolves from</div><ul>`;
            for (const pokemon of resultsArray) {
                returnString += `<li><a href="../pokemon/${pokemon.name}">${pokemon.name}</a></li>`;
            }
            returnString += "</ul>"
            response.send(`${pageHeader(inputPokemonName + ' evolutions')}${returnString}${pageFooter()}`);
            return;
        }
    })
}


/**
 * ===================================
 * Routes
 * ===================================
 */


// Display pokemon by name
app.get('/pokemon/:name', displayPokemon)

// Display index page
app.get('/pokemon/', (request, response) => {
    console.log('sending index page');
    response.send(displayIndexPage());
})

app.get('/type/:inputType', listByType);

app.get('/weaknesses/:inputWeakness', listByWeakness);

app.get('/nextevolution/:inputPokemonName', listNextEvolution);

app.get('*', (request, response) => {
    // send response with some data (a string)
    response.send(`received something I don't understand: ${request}`);
});

// Making a change

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));