const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = "pokedex.json"

//search for pokemon
app.get('/pokemon/search', (request, response) => {
  //allows case-insensitive entry
  var smallLetter = request.query.q.toLowerCase();
  var capsFirst = smallLetter.charAt(0).toUpperCase();
  var combined = capsFirst+smallLetter.slice(1);
  //flags if search for pokemon name turns up negative
  var search = false;
  if (request.query.q === ""){
    response.send(`Welcome to the online Pokdex!`)
  }else{
    jsonfile.readFile(file, function(err,obj){
      for (var i = 0; i < obj["pokemon"].length; i++){
        if (obj["pokemon"][i]["name"] === combined){
          response.write(`
            Name: ${obj["pokemon"][i]["name"]} <br>
            Height: ${obj["pokemon"][i]["height"]} <br>
            Weight: ${obj["pokemon"][i]["weight"]} <br>
            Weaknesses: ${obj["pokemon"][i]["weaknesses"]} <br>
            Type: ${obj["pokemon"][i]["type"]} <br>
            This is ${obj["pokemon"][i]["name"]}, it weighs ${obj["pokemon"][i]["weight"]} and stands at ${obj["pokemon"][i]["height"]}. Its weaknesses are ${obj["pokemon"][i]["weaknesses"]}.
          `);
          search = true;
        }
      }
      response.end();
      if (!search){
        response.status(404).send(
          `Could not find information about ${request.query.q} - Is that a new pokemon? Gotta catch em' all!`
        );
      }
    });
  }
})
//searching pokemon by type
app.get('/type/:type',(request,response)=>{
  var smallLetter = request.params.type.toLowerCase();
  var capsFirst = smallLetter.charAt(0).toUpperCase();
  var combined = capsFirst+smallLetter.slice(1);
  jsonfile.readFile(file, function(err,obj){
    for (var i = 0; i < obj["pokemon"].length; i++){
      for (var j = 0; j < obj["pokemon"][i]["type"].length; j++){
        if (obj["pokemon"][i]["type"][j] === combined){
          response.write(`${obj["pokemon"][i]["name"]}<br>`)
        }
      }
    }
    response.end();
  });
})
//searching pokemon by weakness
app.get('/weakness/:weakness',(request,response)=>{
  var smallLetter = request.params.weakness.toLowerCase();
  var capsFirst = smallLetter.charAt(0).toUpperCase();
  var combined = capsFirst+smallLetter.slice(1);
  jsonfile.readFile(file, function(err,obj){
    for (var i = 0; i < obj["pokemon"].length; i++){
      for (var j = 0; j < obj["pokemon"][i]["weaknesses"].length; j++){
        if (obj["pokemon"][i]["weaknesses"][j] === combined){
          response.write(`${obj["pokemon"][i]["name"]}<br>`)
        }
      }
    }
    response.end();
  });
})
//search for pokemon's next evolution, return final evolution if there is no further
app.get('/nextevolution/:evolve',(request,response)=>{
  var smallLetter = request.params.evolve.toLowerCase();
  var capsFirst = smallLetter.charAt(0).toUpperCase();
  var combined = capsFirst+smallLetter.slice(1);
  jsonfile.readFile(file, function(err,obj){
    for (var i = 0; i < obj["pokemon"].length; i++){
      if (obj["pokemon"][i]["name"] === combined){
        if (obj["pokemon"][i]["prev_evolution"]){
          for (var j = 0; j < obj["pokemon"][i]["prev_evolution"].length; j++){
            response.write(`${obj["pokemon"][i]["prev_evolution"][j]["name"]} <br>`);
          }
        }else {
          response.write(`${obj["pokemon"][i]["name"]} does not have a pokemon it evolved from!`)
        }
      }
    }
    response.end();
  });
})


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
