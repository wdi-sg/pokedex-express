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

//From an array of Pokemon objects, returns an HTML list of all the Pokemon's names linked to their Pokedex page.
const getPokeLinks = function(arr) {
    let output = "<ul>"
    //Give a link to the Pokemon.
    for (let i = 0; i < arr.length; i++) {
        output += `<li><a href="/pokemon/${arr[i].name}">${arr[i].name}</a></li>`
    }
    output += `</ul>`
    return output;
};

//Returns an HTML list of items from an array.
const generateUl = (arr) => {
    let output = "<ul>";
    arr.forEach((item) => {
        output += `<li> ${item}</li>`
    })

    output += "</ul>"
    return output;
}

//Search within a Pokemon object.
//E.g. if you want to search for pokemon's type, then searchFor(pokemon, 'type', 'Fire')
//Equivalent to pokemon['type'].find(..)
//Returns true if there is a result, false if there isn't.

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

            //Start of with pokemon + image + height & weight.
            output = `<h1>${query}</h1> <img src="${result.img}"/> <p>${query} is ${result.height} tall and ${result.weight}! What a cutie.`

            //Generate lists of types/weaknesses.
            const types = generateUl(result.type);
            const weaknesses = generateUl(result.weaknesses)
            output += '<h3>Type</h3>' + types + '<h3>Weaknesses</h3>' + weaknesses

            //If there are previous evolutions, give the list.
            if (result.prev_evolution) {
                const prevEvo = getPokeLinks(result.prev_evolution)
                output += '<h3>Previous Evolutions</h3>' + prevEvo
            }
            //If there are next evolutions, give the list.
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
            //For all the pokemon, check if their type matches the query.
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i]
                let result = searchFor(pokemon, 'type', query) // Returns true or false.

                //If the result returns true, then add it into the results array.
                if (result) {
                    resultArray.push(pokemon)
                }
            }
            //If there are no results, show error.
            if (resultArray.length === 0) {
                output = `Sorry, there are no ${query}-type Pokemon. Please enter a valid type!`
                //If there are results, generate the links to all the Pokemon that match the result.
            } else {
                output += getPokeLinks(resultArray);
            }
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
            //Loop through all the Pokemon in the array.
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i]
                //Check if pokemon.weaknesses includes the query,
                let result = searchFor(pokemon, 'weaknesses', query) // Returns true or false.
                //If the result returns true, then add it into the results array.
                if (result) {
                    resultArray.push(pokemon)
                }
            }
            //If there are no results, show error.
            if (resultArray.length === 0) {
                output = `Sorry, there are no Pokemon with a ${query}-type weakness. Please enter a valid type!`
                //If there are results, generate the links to all the Pokemon that match the result.
            } else {
                output += getPokeLinks(resultArray);
            }
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
            output += `<h2>Pokemon that ${query} evolves from</h2>`
            let resultArray = [];
            //Check through all the Pokemon.
            for (let i = 0; i < pokeArray.length; i++) {
                let pokemon = pokeArray[i];
                //If the Pokemon has a next evolution,
                if (pokemon.next_evolution) {
                    //Loop through the array of next evolutions and check if the name of the Pokemon matches the query.
                    for (let num = 0; num < pokemon.next_evolution.length; num++) {
                        //If there is a match, add it into the results array.
                        if (pokemon.next_evolution[num].name === query) {
                            resultArray.push(pokemon);
                        }
                    }
                }
            }
            //If there are no results, show error.
            if (resultArray.length === 0) {
                output = `Sorry, ${query} had no previous evolutions.`
            } else {
                //If there are results, generate the links to all the Pokemon that match the result.
                output += getPokeLinks(resultArray);
            }
        }
        res.send(output);
    })
});

app.get('*', (req,res) => {
  res.send(`Welcome to the online Pokedex!`)
})

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
