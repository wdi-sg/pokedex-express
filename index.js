const express = require('express');
const jsonfile = require('jsonfile');

const pokedex = "pokedex.json";
const app = express();
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
//this part is to set up the reading of the pokedex.json.
jsonfile.readFile(pokedex, (error, obj) => {
    console.log("error of pokedex reading is: =============");
    console.log(error);
    app.get('/pokemon/:pokemonName', (request, response) => {
      // send response with some data (a string)
        for (i=0;i<obj["pokemon"].length; i++){
            if(obj["pokemon"][i].name === request.params.pokemonName ){
                response.send(obj["pokemon"][i]);
            }else {
                response.status(404).send("Could not find information about " + request.params.pokemonName + " - Is that a new pokemon? Gotta catch em' all!");
            }
        }

        });
});
// Init express app




/**
 * ===================================
 * Routes
 * ===================================
 */



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
















// below is the codes for part 1
// const express = require('express');
// const jsonfile = require('jsonfile');

// const pokedex = "pokedex.json";
// const app = express();
// /**
//  * ===================================
//  * Configurations and set up
//  * ===================================
//  */
// //this part is to set up the reading of the pokedex.json.
// jsonfile.readFile(pokedex, (error, obj) => {
//     console.log("error of pokedex reading is: =============");
//     console.log(error);
//     console.log("pokedex entries: =============");
//     console.log(obj["pokemon"][0]); // this line retrieves pokemon by id, id = process.argv[2] - 1
//     app.get('/pokemon/:pokedexId', (request, response) => {
//       // send response with some data (a string)
//         let pokemonId = parseInt(request.params.pokedexId);
//         response.send(obj["pokemon"][pokemonId-1]);
//         });
// });
// // Init express app




// /**
//  * ===================================
//  * Routes
//  * ===================================
//  */



// /**
//  * ===================================
//  * Listen to requests on port 3000
//  * ===================================
//  */
// app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));