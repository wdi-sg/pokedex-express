/*
Personal Notes 

JSON.parse -> JSON to string
JSON.stringify --> string to JSON

*/

const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json';
const app = express();
/*
const returnInformation = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let index = request.params.id;
    console.log(array[index])
    response.send(array[index])
  })
}
*/

const returnInformation = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let name = request.params.input.toLowerCase();
    let isPokemonFound = false;

    for(let i = 0; i < array.length; i++){
      if(array[i]["name"].toLowerCase() == name){
        let requestedPokemon = array[i];
        isPokemonFound = true
        const capsName = name.charAt(0).toUpperCase() + name.substring(1);
        response.send(`This is ${capsName}, he is ${requestedPokemon.weight} in weight! He is also ${requestedPokemon.height} tall.`)
        console.log("Response sent")
        break;
      }
    }
    
    if(isPokemonFound == false){
      response.status(404).send(`Could not find information about ${name} - Is that a new pokemon? Gotta catch em' all!`)
    }
  })
}

const returnTypes = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let type = request.params.input.toLowerCase();
    let isTypeFound = false;
    let resultArray = [];
    
    for(let i = 0; i < array.length; i++){
      let pokemon = array[i]["name"]
      let typeArray = array[i]["type"]
      
      for(let j = 0; j < typeArray.length; j++){
        if(typeArray[j].toLowerCase() == type){
          isTypeFound = true;
          resultArray.push(pokemon)
        }
      }
    }
    
    if(isTypeFound == false){
      response.status(404).send(`Could not find information about ${type} - Is that a new type? Gotta catch em' all!`)
    } else {
      response.send(resultArray)
    }
  })
}

const returnWeakness = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let weakness = request.params.input.toLowerCase();
    let isWeaknessFound = false;
    let resultArray = [];
    
    for(let i = 0; i < array.length; i++){
      let pokemon = array[i]["name"]
      let weaknessArray = array[i]["weaknesses"]
      
      for(let j = 0; j < weaknessArray.length; j++){
        if(weaknessArray[j].toLowerCase() == weakness){
          isWeaknessFound = true;
          resultArray.push(pokemon)
        }
      }
    }
    
    if(isWeaknessFound == false){
      response.status(404).send(`Could not find information about ${type} - Is that a new type? Gotta catch em' all!`)
    } else {
      response.send(resultArray)
    }
  })
}

const returnPrevEvolution = (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let array = obj["pokemon"];
    let pokemon = request.params.input.toLowerCase();
    let isPokemonFound = false;
    let resultArray = [];
    
    for(let i = 0; i < array.length; i++){
      let ithpokemon = array[i]["name"]

      if(ithpokemon.toLowerCase() == pokemon){
        console.log(`Pokemon found :  ${pokemon}`)
        isPokemonFound = true;
        if(array[i].prev_evolution){
          let prevEvolutionArray = array[i]["prev_evolution"];
          for(let j = 0; j < prevEvolutionArray.length; j++){
            resultArray.push(prevEvolutionArray[j].name)
          }
        } else {
          pokemon = pokemon.charAt(0).toUpperCase() + pokemon.substring(1);
          response.send(`No pre-evolution found for this pokemon - ${pokemon}`)
          return
        }
      }
    }
    
    if(isPokemonFound == false){
      response.status(404).send(`Pokemon not found`)
    } else {
      response.send(resultArray)
    }
  })
}

// Routes 

app.get('/pokemon/:input', returnInformation);
app.get('/', (req,res) => {res.send(`Welcome to the pokedex!`)});
app.get('/types/:input', returnTypes);
app.get('/weakness/:input', returnWeakness);
app.get('/prev/:input', returnPrevEvolution);

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => {console.log("Listening for requests at port 3000")})

/*
Personal Reflections 

JSON.parse -> JSON to string
JSON.stringify --> string to JSON

The code has to be written within the readFile because the obj object only exists within the function.

--
var array 

jsonfile.readFile(file, (err,obj)=>{
  array = obj["pokemon"]
})

console.log(array)
--

array will not be defined.

*/