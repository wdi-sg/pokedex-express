const express = require("express");

const jsonfile = require("jsonfile");

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

const getName = (request, response) => {
  
  const file = "pokedex.json";
  let input = request.params.name.toLowerCase();
 
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log("err", err);
    }
    let foundPoke = false
    const pokeDex = obj.pokemon;
    for (let i = 0; i < pokeDex.length; i++) {
     
      let name = pokeDex[i].name.toLowerCase();
      let weight = pokeDex[i].weight;
      let img = pokeDex[i].img;
      let type = pokeDex[i].type

      if (input === name) {
        foundPoke = true;
        response.send(
          ` <img src=${img}> <br> The Pokemon is ${name}, his weight is ${weight}. His Type is ${type}`
        );
      
      } 
    }
    if(foundPoke === false ){
      response.status(404).send(`Could not find information about ${input} - Is that a new pokemon? Gotta catch em' all!`)
    }
    
  })
  
};

const welcome = (request, response) => {
response.send(`Welcome to the online Pokdex!`)
}
const pokeType = (request, response) => {
  let input = request.params.types;
  const file = "pokedex.json"

  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log("err", err);
    }
    const pokeDex = obj.pokemon;
    let listType = [];
    for(let i = 0; i<pokeDex.length; i++){
      
      let inputType = pokeDex[i].type
      for(let j = 0; j<inputType.length; j++){
        if(input === inputType[j]){
          listType.push(pokeDex[i].name)
          
        }
      }

    }
    response.send(`The List of Pokemon for ${input} are: 
    ${listType}`)
})
}

app.get("/pokemon/:name", getName);
app.get("/pokemon", welcome)
app.get("/pokemon/type/:types", pokeType)

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
