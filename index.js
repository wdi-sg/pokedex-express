const express = require('express');

const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

let pokeobj;
let resultObj = {};

jsonfile.readFile(pokedex, function(err, obj) {
  pokeobj = obj.pokemon;
  // for(let i = 0; i < pokeobj.length; i++){
    // let poketype = pokeobj[i].type;
    // console.log(poketype);}
  // console.log(pokeobj)
  /*for (let i = 0; i < pokeobj.length; i++){
    let pokename = pokeobj[i].name.toLowerCase();
    console.log(pokename);
  }*/
  // obj.pokemon.forEach((pokemon,i) => {resultObj[pokeobj[i].name.toLowerCase()] = pokemon})
  //console.log(resultObj);
    // let pokename = Object.keys(resultObj);
    // console.log(pokename);
});

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

app.get("/type/:type", (request, response) => {
  // console.log("hello");
// console.log("path:", request.path);

  // console.log(request.params.type);
  var result = [];
  // var html = "<html>";
  // html += "<h1>Pokedex</h1>";

  for(var i = 0; i < pokeobj.length; i++){
    var poketype = pokeobj[i].type;
    // console.log(poketype);
      for (var j = 0; j < poketype.length; j++){
        if(request.params.type.toLowerCase() === poketype[j].toLowerCase()){
          //html += "<h2>" + poketype[j] + "</h2>";
          // console.log("subtitle", subtitle);
              result.push( "<p>" + pokeobj[i].name + "</p>");
        }
              // console.log(result);
      }
    }
    // result.push(html, result);
    // console.log(result);
    response.send(result.join(""));

 });
//
// app.get('/weakness/', (request, response) => {
//
//  });
//
// app.get('/nextevolution/', (request, response) => {
//
//  });

app.get('*', (request, response) => {
  // send response with some data (a string)

      // console.log(request.path);
        let myParams = request.path.split("/")[1];
        // console.log(request.path.split("/")[0]);
       // console.log("params: " + myParams);

       for(let i = 0; i < pokeobj.length; i++){
         if(myParams.toLowerCase() === pokeobj[i].name.toLowerCase()){
           // console.log("hello")
           // response.send(pokeobj[i].name + " "+ pokeobj[i].weight);

           let html = "";

            html += "<html>";
            html += "<body>";
            html += "<h1>Pokedex:</h1>";
            // html += '<a href="/'+nextId+'">LINK TO NEXT POKEMON</a>';
            html += "<h2>" + pokeobj[i].name + "</h2>";
            html += "<p> Weight: "+ pokeobj[i].weight + "</p>";
            html += "<p> Height: "+ pokeobj[i].height + "</p>";
            html += '<img src ="'+ pokeobj[i].img + '"/>';
            html += "<p> Type: "+ pokeobj[i].type + "</p>";
            html += "<p> Weaknesses : "+ pokeobj[i].weaknesses + "</p>";
            html += "</body>";
            html += "</html>";

            response.send(html);
        }
            else if(myParams.toLowerCase() === ""){

            response.send("Welcome to the online Pokedex!");

           }
       }
  // console.log("PATH:",request.path);
  // response.send('hi');
  response.status(404).send("Could not find information about " + myParams + " - Is that a new pokemon? Gotta catch em' all!");

});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
 app.listen(3001, () => console.log('~~~ Tuning in to the waves of port 3001 ~~~'));
