const express = require("express");
const jsonfile = require('jsonfile');
const file = "pokedex.json";
// const jsonfile = require('jsonfile');

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

//  app.get("/pokedex/:ttname/:hello", (request, response) => {
//    console.log("PARAMs: ", request.params);
//    console.log("00000000000000000000000000");
//    console.log("ttname: " + request.params.ttname);
//    console.log("00000000000000000000000000");
//    console.log("hello: " + request.params.hello);
//    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");

//    console.log("START request query");
//    console.log(request.query);
//    console.log("~~~~ END request query");
//    response.send("yeah, " + request.params.ttname);
//  });

app.get("/pokemon/:name", (request, response) => {

    var outputWeight;
    jsonfile.readFile(file, (err, obj) => {
      console.log("DDDD")
      for (var i = 0; i < obj["pokemon"].length; i++) {
          if (obj["pokemon"][i]["name"] == request.params.name){
            outputWeight = obj["pokemon"][i]["weight"];
            console.log(outputWeight);
          }
            //console.log(obj["pokemon"][i]["name"]);
      }

      response.send(outputWeight);
      console.log("YAY");
    });
    console.log("ff");

    console.log(request.params.name);



});
// app.get("/pokemon/charmander", (request, response) => {
//   response.send("hello!");
// });
// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
