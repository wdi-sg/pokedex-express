const express = require('express');
const jsonfile = require('jsonfile');

// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

const doPokemon = (request, response)=>{
  console.log("pokemon request");

  const file = 'pokedex.json'

  jsonfile.readFile(file, (err, obj) => {
    let pokeList = obj["pokemon"];
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(pokeList[0])
    // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // console.log(pokeList[0].name)


    if( err ){
      console.log("ERR", err );
      response.send('404 @@@@@ error!!!!!')
    } else {
        let message;
        let pokeName = request.params.name;
        let status;
        for (let i = 0; i < pokeList.length; i++) {
            if (pokeList[i].name === pokeName) {
            console.log("checking from pokedex")
                message = "This is " +pokeList[i].name + ". His weight is " + pokeList[i].weight + " and type[s] is/are " + pokeList[i].type + "."
                status = true;
// created boolean statement above to see determine that match is 'true'.
            console.log("printed from pokedex");
            } else if (status != true) {
                console.log("wrong pokemon");
                message = "Could not find weight information about " + request.params.name + "." + " Is that a new pokemon? Gotta catch em' all!"
            }
        }

    response.send(message);


    // console.log("WOW FINISHED READING",obj.pokemon[1])
    // const firstPoke = obj.pokemon[1];

    // console.log("NAME: "+firstPoke.name );
    // response.send("WHOA: "+firstPoke.name);
    }
  })
};

const startingPage = (request,response) => {
    response.send("Welcome to the online pokedex!")
}
/**
 * ===================================
 * Routes
 * ===================================
 */

app.get('/pokemon/:name', doPokemon)
app.get('*', startingPage);
/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));