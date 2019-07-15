const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json';

// jsonfile.readFile(file, function (err, obj) {
//   if (err) console.error(err)
//   console.dir(obj)
// })




/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */

app.get("/pokemon/:id", (request, response) => {

    //display entire object
    jsonfile.readFile(file, function (err, obj) {
      if (err) {
        console.error(err);
      }
      // console.dir(obj);
      // console.log("hi");
      //if each object.name = input, display it's weight
      obj.pokemon.forEach(arr => {
        // console.log(arr.name);
        if (arr.name == request.params.id){
            console.log("it works");
            response.send(`<html><img src= ${arr.img}><br></html> My name is ${arr.name} and  my weight is  ${arr.weight}`)
        }else{
            response.send(`Is ${request.params.id} a new Pokemon?, gonna catch them all!`);
            reponse.status(404);
        };
      })
    })
});

// /**
//  * ===================================
//  * Listen to requests on port 3000
//  * ===================================
//  */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));