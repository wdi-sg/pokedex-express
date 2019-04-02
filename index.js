const express = require('express');
// var app = express();

// app.locals.pokedex = require(./pokedex.json);
// const package.json = require('package.json');
// const jsonfile = require('jsonfile');
const pokedex = require('./pokedex.json');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();
// app.locals.pokemon = require(./pokedex.json);
/**
 * ===================================
 * Routes
 * ===================================
 */
// pokedex.pokemon.forEach(function(item){item.name})
// app.get('*', (request, response) => {
//   // send response with some data (a string)
//   response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
// app.get("/pokedex"), (request, response) => {

//     let pokedex = request.params.pokemon.name
//     response.send("The pokemon is: " + (request.params.pokemon.name))
// };


// app.get('/file/:name', function (req, res, next) {

//   var options = {
//     root: __dirname + '/public/',
//     dotfiles: 'deny',
//     headers: {
//         'x-timestamp': Date.now(),
//         'x-sent': true
//     }
//   };

//   var fileName = req.params.name;
//   res.sendFile(fileName, options, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log('Sent:', fileName);
//     }
//   });

// });
//  app.get("/pokemon/:number", (request, response) => {

//     let pokemonNumber = request.params[0].number
//     const result=


// });

// app.get("/add/:x/:y", (request, response) => {
//   response.send("The answer is: " + (parseInt(request.params.x) + parseInt(request.params.y)))
// });

// var express = require('express');
// var app = express();

app.use(express.static('public'));
app.get('/pokedex', function (req, res) {
   res.sendFile( __dirname + "/" + "pokedex.json" );
})

app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      name:req.query.id,
      // last_name:req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port

//    console.log("Example app listening at http://%s:%s", host, port)
// })

app.listen(3000);
    // () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));