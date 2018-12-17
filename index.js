const express = require('express');
const jsonfile = require('jsonfile');
const file = "pokedex.json";
const app = express();
var pokeObject = "", numDex;

var nameChecker = function (keyWord) {
    jsonfile.readFile(file, (err, obj) => {
        console.log(err);
        for (var i in obj.pokemon){
            console.log(i);
            console.log(keyWord, obj.pokemon[i])
            if (keyWord == obj.pokemon[i].name){
                console.log(keyWord+" weight is "+obj.pokemon[i].weight                );
                numDex = i;
                return obj.pokemon[i].weight
            }
        }
        return ("Could not find information about" + keyWord);
    })
};
app.get('/', (request, response) => {
  response.send('Welcome to Online Pokdex')
});

app.get("/pokemon/*", function(req, response) {
    let myParams = req.params[0].split("/")
    // let result = nameChecker(myParams);
    // console.log(numDex)
    response.send(myParams+ "Weight is  " + nameChecker(myParams))
})



/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
