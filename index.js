const express = require('express');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const jsonfile = require('jsonfile');
const file = 'pokedex.json'


/**
 * ===================================
 * Routes
 * ===================================
 */
console.log("defining when request recieved code");
var whenRequestIsRecieved = (request, response) => {
    console.log("start log request");
    console.log(reqest);
    console.log("END LOG REQUEST");
};




app.get('/pokedex/:name', (request, response)=>{
    console.log(request.params.name );
    jsonfile.readFile(file, (err, obj) => {
        var namesList = [];
        var names = function() {
            for (let i = 0; i < obj.pokemon.length; i++){
                //Object.keys(obj.pokemon[i].name);
                namesList.push(obj.pokemon[i].name);
            }
        //console.log(namesList);
        }

        names();

        if (namesList.includes(request.params.name)){
            for (let i = 0; i < obj.pokemon.length; i++){
                if (obj.pokemon[i].name === request.params.name){
                    console.log(i);
                    console.log(obj.pokemon[i]);
                    // get data from the file
                    const data = obj.pokemon[i];
                    response.send(data);
                }
            }
        } else if (request.params.name != namesList) {
            const data = `Could not find information about ${request.params.name} - Is that a new pokemon? Gotta catch em' all!`
            response.status(404).send(data);
        }
    })
});

app.get('/pokedex/', (request, response)=>{
            const data = "Welcome to the online Pokdex!";
            response.send(data);
});

app.get('*', (request, response) => {
  // send response with some data (a string)
  response.send(request.path);
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));