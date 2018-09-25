const express = require('express');
const jsonfile = require('jsonfile');
const app = express();

//retrieve data from pokedex.json file
const file = "pokedex.json"



var getPokemon = function (request, response){
  // send response with some data (a string)
    var userInputPath = request.path.split("/")[2].toLowerCase()
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
                    let html = "";

                    html += "<html>"
                    html += "<head>"
                    html += "</head>"
                    html += "<body>"
                    html += "<img src=" + element.img + ">" + element.name


                    html += "</body>"
                    html += "</html>"

                    console.log(html)
                    response.send(html)
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


//app.get('*', respondToType)



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */



/**
 * ===================================
 * Part 2 of exercise
 * ===================================
 */




var respondToTypeHtml = function(request, response){



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

    let html = "";

    html += "<html>"
    html += "<head>"
    html += "</head>"
    html += "<body>"
        html += "<ul>"

        outputList.forEach(function(element){
            html += "<li>" + element + "</li>"
        })

        html += "</ul>"
    html += "</body>"
    html += "</html>"

    console.log(html)
    response.send(html)
})

}


// app.get('*', respondToTypeHtml)



var rootPage = function(request, response){
    var userInputPath = request.path.split("/")
    console.log(request.path)
    console.log(userInputPath[1])

    jsonfile.readFile(file, function(err, obj){

        var arrayListOfPokemon = obj.pokemon

            let html = "";

            html += "<html>"
            html += "<head>"
            html += "</head>"
            html += "<body>"
                html += "<ul>"

            if (userInputPath[1] === "pokemon"){
                arrayListOfPokemon.forEach(function(element){
                    html += "<li>" + "<img src=" + element.img + ">" + element.name + "</li>"
                    html += '<a href="/pokemon/'+element.name+'">Link to pokemon</a>'
                })

            }

                html += "</ul>"
            html += "</body>"
            html += "</html>"


            console.log(html)
    response.send(html)

    })

}

app.get("/pokemon", rootPage);


app.get('/pokemon/*', getPokemon)

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));













