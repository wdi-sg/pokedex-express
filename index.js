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
  const file = "pokedex.json"
  
  jsonfile.readFile(file, (err, obj) => {
    if(err) {
      console.log("err", err);
    }

    const pokeDex = obj.pokemon;
    for(let i = 0; i< pokeDex.length; i++) {
      let name = pokeDex[i].name
      let weight = pokeDex[i].weight
      let img = pokeDex[i].img
      let input = request.params.name
      if(input=== name){
       
        response.send(` <img src=${img}> <br> The Pokemon is ${name}, his weight is ${weight}`)
      } else if(!pokeDex.includes(request.params.name)){
        response.send('asdasds')
      }
    }

  })
}

app.get('/pokemon/:name', getName)

  





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
