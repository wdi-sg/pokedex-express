const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

//retrieve data from pokedex.json file
const file = "pokedex.json"



var respondToRequest = function (request, response){
  // send response with some data (a string)
    var userInputPath = request.path.split("/")[1]

    //read pokedex.json file
    jsonfile.readFile (file, function(err, obj){

        var arrayListOfPokemon = obj.pokemon

        var output;

        if (userInputPath === ""){
            response.send("Welcome to the online pokedex")
        }

        else{

            //loop through each member of the pokemon array
            arrayListOfPokemon.forEach(function(element){

                //comparing what the user enter in url and the pokedex.json to get correct pokemon

                if( userInputPath === element.name.toLowerCase() ){
                    output = element.weight
                    response.send(output)
                };

            });

            if(output === undefined){
            response.send("Could not information about " + userInputPath + "\nIs that a new pokemon? Gotta catch em' all!")
            };
        };
    })
};


//type could be type, weakness, nextevolution
//sometype must be in accordance to the type


var respondToType = function(request, response){



var userInputPath = request.path.split("/")
console.log(userInputPath[1])
console.log(userInputPath[2])

jsonfile.readFile( file, function(err, obj){



    var arrayListOfPokemon = obj.pokemon

    var outputList = []

    if (userInputPath[1] === "type"){

        //loop through each pokemon
        arrayListOfPokemon.forEach(function(element){

            //loop through each type
            element.type.forEach(function(someType){
                if(userInputPath[2] === someType.toLowerCase()){
                    console.log("userInput2")
                    outputList.push(element.name)
                }
            })
        })
    }

    else if (userInputPath[1] === "weaknesses"){

        //looping through each pokemon
        arrayListOfPokemon.forEach(function(element){

            //loop through array of weakness(there is more that one weakness)
            element.weaknesses.forEach(function(someWeakness){
                if(userInputPath[2] === someWeakness.toLowerCase()){
                    outputList.push(element.name)
                }
            })
        })
    }

    else if (userInputPath[1] === "nextevolution"){

        //looping each pokemon
        arrayListOfPokemon.forEach(function(element){
            if(userInputPath[2] === element.name.toLowerCase()){

                //loop through each stage of evolution
                element.next_evolution.forEach(function(evolution){
                   outputList.push(evolution.name)
                })

            }

        })
    }

    response.send(outputList)
})

}


app.get('*', respondToType)

//app.get('*', respondToRequest)


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
