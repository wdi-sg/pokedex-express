const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

//retrieve data from pokedex.json file
const file = "pokedex.json"



var respondToRequest = function (request, response){
  // send response with some data (a string)
    var userInputPath = request.path.split("/")[1]
    console.log(userInputPath)

    //read pokedex.json file
    jsonfile.readFile (file, function(err, obj){

        var arrayListOfPokemon = obj.pokemon

        var output;


        //loop through each member of the pokemon array
        arrayListOfPokemon.forEach(function(element){

            //comparing what the user enter in url and the pokedex.json to get correct pokemon

            if( userInputPath === element.name.toLowerCase() ){
                output = element.weight
                response.send(output)
            };

        });

        if(output === undefined){
        response.send("Could not information about " + userInputPath)
        };
    })
};




app.get('*', respondToRequest)


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
