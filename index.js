const express = require('express');
const handlebars = require('express-handlebars');
const jsonfile = require("jsonfile");
const file = "pokedex.json"

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

// Set handlebars to be the default view engine
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

/**
 * ===================================
 * Routes
 * ===================================
 */

//  //Qn 1
// app.get("/", function(request, response) {
//   response.send("Welcome to the online Pokedex!")
// })

// //Qn 2
// app.get('/names/:pokemon', (request, response) => {
//   jsonfile.readFile(file, function (err, obj) {
//     for (let i = 0; i < obj.pokemon.length; i++) {
//       if (obj.pokemon[i]["name"].toLowerCase() == request.params.pokemon.toLowerCase()) {
//         response.send(obj.pokemon[i]["weight"]);
//       }
//     }
//   });
// });

// //Qn 3
// app.get('/names/:name', function (request, response) {
//   jsonfile.readFile(file, function (err, obj) {

//     for (let i = 0; i < obj.pokemon.length; i++) {

//       if (obj.pokemon[i]["name"].toLowerCase() == request.params.name.toLowerCase()) {

//         let context = {
//           name: "" + obj.pokemon[i]["name"],
//           weight: "" + obj.pokemon[i]["weight"]
//         }
//         // running this will let express to run home.handlebars file in your views folder
//         response.render('home', context);
//       };
//     };
//   });
// })

// //Qn 4
// app.get('/names/:name', function (request, response) {

//   jsonfile.readFile(file, function (err, obj) {

//     let names = [];

//     for (let i = 0; i < obj.pokemon.length; i++) {
//       names.push(obj.pokemon[i]["name"]);
//     };

//     if (names.indexOf(request.params.name.toLowerCase() == -1)) {

//       let context = {
//         wrongName: request.params.name
//       };
//       // running this will let express to run home.handlebars file in your views folder
//       response.render('home', context);
//     }
//   });
// })

// //Qn 5
// app.get('/', (request, response) => {
//       jsonfile.readFile(file, function (err, obj) {
//           let allNames = [];
//           for (let i = 0; i < obj.pokemon.length; i++) {
//             allNames.push(obj.pokemon[i]["name"]);
//           };

//           let context = {
//             welcome: "Welcome to the online Pokedex!",
//             nameList: allNames
//           }

//           // send response with some data (a HTML file)
//           response.render('home', context);
//         });
//       });

// //Qn 6
// app.get('/names/:name', function (request, response) {
//   jsonfile.readFile(file, function (err, obj) {

//     for (let i = 0; i < obj.pokemon.length; i++) {

//       if (obj.pokemon[i]["name"].toLowerCase() == request.params.name.toLowerCase()) {

//         let context = {
//           name: obj.pokemon[i]["name"],
//           stats: obj.pokemon[i]
//         }
//         // running this will let express to run home.handlebars file in your views folder
//         response.render('home', context);
//       };
//     };
//   });
// })

//Qn 7
app.get('/types/:type', function (request, response) {

  jsonfile.readFile(file, function (err, obj) {
    let typeMatch = [];

    for (let i = 0; i < obj.pokemon.length; i++) {

      obj.pokemon[i]["type"].forEach(function (element) {

        if (element.toLowerCase() == request.params.type.toLowerCase()) {

          typeMatch.push(obj.pokemon[i]["name"]);
        };
      });
    };

    context = {
      typeNames: typeMatch
    };
    // running this will let express to run home.handlebars file in your views folder
    response.render('home', context);
  });
});



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));