const express = require('express');

const jsonfile = require('jsonfile');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
const file = 'pokedex.json';

/**
 * ===================================
 * Routes
 * ===================================
 */

// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send("hello");
// });

app.get('/:pokemon', (request, response) => {
  // send response with some data (a string)
  let pokemonName = request.params.pokemon;

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
        console.log("Error during read!");
        console.log(err);
    } else {
        let match;
        console.log("39: match: "+match);
        for (i=0; i<obj.pokemon.length; i++) {
            let pokemonNameInJson = obj.pokemon[i]["name"];
            let weight = obj.pokemon[i]["weight"];
            let height = obj.pokemon[i]["height"];
            let type = obj.pokemon[i]["type"];
            let weakness = obj.pokemon[i]["weaknesses"];

            if (type.length===1) {
                let typeString = `a ${type[0]} type Pokemon.`
            } else {
                typeString = `a ${type[0]} and ${type[1]} type Pokemon.`;
            }

            let weaknessString = "";
            for (j=0; j<weakness.length; j++) {
                j!==weakness.length-1 ? weaknessString += weakness[j]+", " : weaknessString += " and "+weakness[j]+".";
            }

            console.log("58: weaknessString:"+weaknessString);

            if (pokemonNameInJson.toLowerCase() === pokemonName) {
                console.log("62: Found Match!");
                match = true;
                response.send(`This is ${pokemonNameInJson}, ${typeString} <br>${pokemonNameInJson} is ${weight} in weight and ${height} in height. <br>It is weak to ${weaknessString}`);
            }

        }
        if (match===undefined) {
                console.log("69: No match!");
                response.send(404, `Could not find information about ${pokemonName} - Is that a new Pokemon? Gotta catch em'all!`)
            }
    }
  })
});

app.get('/type/:type', (request, response) => {
  // send response with some data (a string)
  let typeInput = request.params.type;
  typeInput = capsFirstLetter(typeInput);

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
        console.log("Error during read!");
        console.log(err);
    } else {
        let match;
        console.log("90: match:"+match);

        let sameTypeArray = [];
        let sameTypeString = "";
        for (i=0; i<obj.pokemon.length; i++) {
            let pokemonNameInJson = obj.pokemon[i]["name"];
            let type = obj.pokemon[i]["type"];


            if (type.includes(typeInput)) {
                console.log("Found Match!");
                match = true;
                sameTypeString+=pokemonNameInJson+"<br>";
            }
        }
        if (match===true) {
            response.send(`${typeInput} Type Pokemon:<br>${sameTypeString}`);
        } else if (match===undefined) {
                console.log("110: No match!");
                response.send(404, `Could not find information about ${pokemonName} - Is that a new Pokemon? Gotta catch em'all!`)
            }
    }
  })
});

app.get('/', (request, response) => {
    response.send(`Welcome to the Online Pokedex!`);
});

function capsFirstLetter (string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));