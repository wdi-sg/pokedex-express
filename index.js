const express = require('express');
const jsonfile = require('jsonfile');
const file = "./pokedex.json";
var found = false

// Init express app
const app = express();



var findSinglePokemon = function (request, response){

var searchName = request.params.name;

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console("ERRRORRR~~");
        }
        else {
            for (let i = 0; i < obj["pokemon"].length; i++) {
                var chosenPoke = obj["pokemon"][i];

                if(searchName.toLowerCase() === chosenPoke["name"].toLowerCase()){
                    response.send(`${chosenPoke["name"]} is ${chosenPoke["weight"]} in weight and ${chosenPoke["height"]} in height.<br>He is a ${chosenPoke["type"]} type Pokemon and his weakness is ${chosenPoke["weaknesses"]}.`);
                    found = true;
                    break;
                }
            }
                if (found === false) {
                    response.status (404);
                    response.send(`Could not find information about ${searchName}!<br> Is that a new pokemon? Gotta catch em' all!`)
                }
            }
    });
};


var findType= function (request, response){

var searchType = request.params.type;
var typeFullList = []

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console("ERRRORRR~~");
        }
        else {
            for (let i = 0; i < obj["pokemon"].length; i++) {
                for (let j = 0; j < obj.pokemon[i]["type"].length; j++){
                    var chosenPoke = obj["pokemon"][i];
                    var databaseType = chosenPoke["type"][j];

                    if(searchType === databaseType){
                        typeFullList.push(`${chosenPoke["name"]}`);
                        found = true;
                        break;
                        }
                            // else{
                            //     response.status(404)
                            //     response.send("No such type exists!");
                            // }
                    }
                }
            var typeFullListJoin = typeFullList.join("<br>");
            response.send(`${searchType} type of Pokemon consist of:<br><br> ${typeFullListJoin}`);
        }
    });
};


var findWeakness= function (request, response){

var searchWeakness = request.params.weakness;
var weaknessFullList = []

    jsonfile.readFile(file, (err, obj) => {
        if (err){
            console("ERRRORRR~~");
        }
        else {
            for (let i = 0; i < obj["pokemon"].length; i++) {
                for (let j = 0; j < obj.pokemon[i]["weaknesses"].length; j++){
                    var chosenPoke = obj["pokemon"][i];
                    var databaseWeakness = chosenPoke["weaknesses"][j];

                    if(searchWeakness === databaseWeakness){
                        weaknessFullList.push(`${chosenPoke["name"]}`);
                        found = true;
                        break;
                        }
                            // else{
                            //     response.status(404)
                            //     response.send("No such type exists!");
                            // }
                    }
                }
            var weaknessFullListJoin = weaknessFullList.join("<br>");
            response.send(`Pokemons that have ${searchWeakness} as weakness are:<br><br> ${weaknessFullListJoin}`);
        }
    });
};


var defaultHome = function (request, response) {
    response.send(`<h1>Welcome to the online Pokedex!</h1>`);
}



app.get("/pokemon/:name", findSinglePokemon);
app.get("/pokemon/type/:type", findType);
app.get("/pokemon/weakness/:weakness", findWeakness);
app.get('/', defaultHome);




/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));