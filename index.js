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

app.get('/hello', (request, response) => {
  response.send('Welcome to the online pokedex!')
});

app.get('/', (request, response) => {
  response.send('Welcome to the online pokedex123!')
});


app.get('/pokemon/:name', (request, response) => {
  // send response with some data (a string)

  jsonfile.readFile(file, (err, obj) => {

    for (let i=0; i<obj.pokemon.length; i++ ){
        console.log('pokemon name is: ' + obj.pokemon[i].name.toLowerCase());
        if (obj.pokemon[i].name.toLowerCase() === request.params.name) {
            response.send(`poke name is: ${obj.pokemon[i].name}, poke weight is: ${obj.pokemon[i].weight}`);
        }
        if (obj.pokemon[i].name.toLowerCase() !== request.params.name) {
            response.send('please key in valid pokeon!');
        }
    }
  });
});


app.get('/type/:atype', (request, response) => {

  jsonfile.readFile(file, (err, obj) => {

    console.log('request.params.atype is: ' + request.params.atype);
    console.log(obj.pokemon.length);
    let arrayName = [];

    for (let i=0; i<obj.pokemon.length; i++ ){
        let poke = obj.pokemon[i];
        for (let j=0; j<obj.pokemon[i].type.length; j++) {
            if (poke.type[j].toLowerCase() === request.params.atype) {
                console.log(obj.pokemon[i].type[j]);
                arrayName.push(obj.pokemon[i].name);
            }
        }
    }
    console.log(arrayName);
    response.send(arrayName);

  });
  console.log('testing the pokemon');
});

app.get('/weaknesses/:aweakness', (request, response) => {

  jsonfile.readFile(file, (err, obj) => {

    console.log('request.params.aweakness is: ' + request.params.aweakness);
    let arrayName = [];

    for (let i=0; i<obj.pokemon.length; i++ ){
        for (let j=0; j<obj.pokemon[i].weaknesses.length; j++) {
            if (obj.pokemon[i].weaknesses[j].toLowerCase() === request.params.aweakness) {
                console.log(obj.pokemon[i].weaknesses[j]);
                arrayName.push(obj.pokemon[i].name);
            }
            // if (obj.pokemon[i].type[j] !== request.params.atype) {
            //     response.send('please key in valid type!');
            // }
        }
    }
    console.log(arrayName);
    response.send(arrayName);

  });
  console.log('testing the pokemon');
});

app.get('/nextevolution/:somename', (request, response) => {

  jsonfile.readFile(file, (err, obj) => {

    console.log('request.params.somename is: ' + request.params.somename);
    let arrayName = [];

    for (let i=0; i<obj.pokemon.length; i++ ){
        if (obj.pokemon[i].name.toLowerCase() === request.params.somename) {
            arrayName.push(obj.pokemon[i]['next_evolution'][0]);
        }

    }
    console.log(arrayName);
    response.send(arrayName);

  });
  console.log('testing the pokemon');
});

app.get('/', (request, response) => {
  // send response with some data (a string)
  console.log('this is the base');
  // response.send(request.path);\
  response.send("yo");
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
const port = 3000;

app.listen(port, () => console.log('~~~ Yo, Tuning in to the waves of port '+ port +' ~~~'));