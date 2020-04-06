const express = require('express');
const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json'
const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}

const getPokeLinks = function(arr) {
    let output = "<ul>"
    //Give a link to the Pokemon.
    for (let i = 0; i < arr.length; i++) {
        output += `<li><a href="/pokemon/${arr[i].name}">${arr[i].name}</a></li>`
    }
    output += `</ul>`
    return output;
};

const breakdownArray = (arr) => {

    let output = "<ul>";
    arr.forEach((item) => {
        output += `<li> ${item}</li>`
    })

    output += "</ul>"
    return output;
}

function searchFor(obj, param, str) {
    let item = obj[param]
    let result = item.find((element) => element === str)

    if (result) {
        return true
    } else {
        return false
    }
}

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:name', (req, res) => {
    let output = "";
    jsonfile.readFile(file, (err, obj) => {
        const pokeArray = obj.pokemon
        const query = capitalize(req.params.name)
        let result = pokeArray.find((obj) => obj.name === query)
        //If there is no query, welcome the user to the Pokedex.
        if (!query) {
            output = `Welcome to the online Pokedex!`
            //If there is no result, give error status.
        } else if (result === undefined) {
            output = `Could not find information about ${query}. Is that a new Pokemon? Gotta catch em' all!`
            //If there is a query & a result, give some info about the Pokemon.
        } else {
            output = `<h1>${query}</h1> <img src="${result.img}"/> <p>${query} is ${result.height} tall and ${result.weight}! What a cutie.`

            const types = breakdownArray(result.type);
            const weaknesses = breakdownArray(result.weaknesses)

            output += '<h3>Type</h3>' + types + '<h3>Weaknesses</h3>' + weaknesses

            if (result.prev_evolution) {
                const prevEvo = getPokeLinks(result.prev_evolution)
                output += '<h3>Previous Evolutions</h3>' + prevEvo
            }
            if (result.next_evolution) {
                const nextEvo = getPokeLinks(result.next_evolution)
                output += '<h3>Next Evolutions</h3>' + nextEvo
            }
        }
        res.send(output);
    })
});

app.get('/type/:sometype', (req, res) => {
    let output = "";
    jsonfile.readFile(file, (err, obj) => {
        const pokeArray = obj.pokemon
        const query = capitalize(req.params.sometype)
        //If there is no query, welcome the user to the Pokedex.
        if (!query) {
            output = `Welcome to the online Pokedex!`
            //If there is no result, give error status.
        } else {
            output += `<h2>${query}-type Pokemon</h2>`
            let resultArray = [];
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i]
                let result = searchFor(pokemon, 'type', query)
                if (result) {
                    resultArray.push(pokemon)
                }
            }
            output += getPokeLinks(resultArray);
        }
        res.send(output);
    })
});

app.get('/weakness/:query', (req, res) => {
    let output = "";
    jsonfile.readFile(file, (err, obj) => {
        const pokeArray = obj.pokemon
        const query = capitalize(req.params.query)
        //If there is no query, welcome the user to the Pokedex.
        if (!query) {
            output = `Welcome to the online Pokedex!`
        } else {
            output += `<h2>Pokemon with ${query}-type weakness</h2>`
            let resultArray = [];
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i]
                let result = searchFor(pokemon, 'weaknesses', query)
                if (result) {
                    resultArray.push(pokemon)
                }
            }
            output += getPokeLinks(resultArray);
        }
        res.send(output);
    })
})

app.get('/nextevolution/:query', (req, res) => {
    let output = "";
    jsonfile.readFile(file, (err, obj) => {
        const pokeArray = obj.pokemon
        const query = capitalize(req.params.query)
        //If there is no query, welcome the user to the Pokedex.
        if (!query) {
            output = `Welcome to the online Pokedex!`
        } else {
            let resultArray = [];
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i];
                if (pokemon.next_evolution) {
                    for (let num = 0; num < pokemon.next_evolution.length; num++) {
                      if (pokemon.next_evolution[num].name === query) {
                        resultArray.push(pokemon);
                      }
                    }
                }
            }
            if (resultArray.length===0) {
              output = `Sorry, ${query} had no previous evolutions.`
            } else {
              output += `<h2>Pokemon that ${query} evolves from</h2>`
              output += getPokeLinks(resultArray);
            }
        }
        res.send(output);
    })
});

app.get('*', (request, response) => {
    // send response with some data (a string)
    response.send(`Welcome to the Pokedex!`);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
