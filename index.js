const express = require('express');

const jsonfile = require('jsonfile');

const file = "./pokedex.json";

const app = express();
var found = false;



app.get("/pokemon/:name", (request, response) => {
  // send response with some data (a string)
  jsonfile.readFile(file, (err, obj) => {
    if (err){
        console.log("ERRRRORRR~")
    }else {
        for(i=0; i<obj.pokemon.length; i++){
            if(obj.pokemon[i].name.toLowerCase()===request.params.name.toLowerCase()){
                response.send("This is "+obj.pokemon[i].name+
                    ", it is "+obj.pokemon[i].weight+
                " in weight! It is also a "+
                obj.pokemon[i].type+" type pokemon, "+
                "has a height of "+obj.pokemon[i].height+
                " and lays eggs "+obj.pokemon[i].egg+" apart."
                );
                found = true;
            }
        }
            if (found === false){
                response.send("Could not find information about "+(request.params.name)+" - Is that a new pokemon? Gotta catch em' all!");
        }
    }
})
});

app.get("/", (request, response) => {
    response.send("Welcome to the online Pokdex!");
    });


//   response.send(request.path);
// });


/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

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
