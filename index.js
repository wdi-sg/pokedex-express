const express = require('express');
const jsonfile = require('jsonfile');


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const file = 'pokedex.json';

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

 var handleRequest = (request, response) =>{
    console.log("Handling response now...");
    console.log("request path: "+ request.path );

    var takingOffSlash = (requestPath) => {
        if (requestPath.charAt(0) === "/"){
            requestPath = requestPath.substr(1); //get rid of the first letter
        }
        if (requestPath.charAt(requestPath.length - 1) === "/"){
            requestPath = requestPath.substr(0, requestPath.length - 1);
        }
        return requestPath; // to take off the slashes so that you can compare with the name
    };

    jsonfile.readFile(file, (err, obj)=>{
        if (err){
            console.log(err);
        }
        else{
            const pokemonObj = obj.pokemon;
            for (let i = 0; i < pokemonObj.length; i++){
                if (pokemonObj[i].name.toLowerCase() === takingOffSlash(request.path.toLowerCase())){
                    response.send(pokemonObj[i].weight);
                }
            }
        }


    })
 }

app.get('*', handleRequest);


//(request, response) => {
//   // send response with some data (a requestPath)
//   // var requestPath = request.path;
//   // var nameSearch = requestPath.replace('/','');

//   jsonfile.readFile(file, (err,obj)=>{

//       const pokemonObj = obj.pokemon;
//       let resultName = [];
//       let resultWeight = [];

//     for (let i = 0; i < pokemonObj.length; i++){
//         let pokemonName = pokemonObj[i];
//         if (pokemonName.name === request.params.name){
//             response.send(pokemonName.weight);
//         }
//        // resultName.push('<li>' + pokemonName + ': ' + pokemonWeight + '</li>');
//     }
//   }
//   )
// });


  //     var pokemonWeightFunc = () => {
  //       for (let i = 0; i < pokemon.length; i++){
  //           let pokemonWeight = pokemon[0].weight;
  //           resultWeight.push(pokemonWeight);

  //       }
  //       return resultWeight;
  //     }

  //     var makeHtmlPage = (name, weight) => {
  //       let weightPage = '<ul>' +  name + ": " + weight + '</ul>';
  //       let htmlPage = '<html><head></head><body><h1>' + 'Weight of pokemon is: ' + '</h1>' + weightPage + '</body></html>';
  //       return htmlPage;
  //     }

  //     response.send(makeHtmlPage(pokemonNameFunc(), pokemonWeightFunc()));
  // })



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));




