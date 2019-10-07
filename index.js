const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

const app = express();


jsonfile.readFile(file, (err, obj) => {

    console.log("reading")

    app.get('/pokemon/:index', (request, response) => {
      // send response with some data (a string)
      let index = request.params.index
      response.send("WEIGHT: " + obj.pokemon[index].weight);
});

      jsonfile.writeFile(file, obj, {spaces:2},(err) => {
        console.log(err)
      });
});

// app.get('/pokemon/:index', (request, response) => {
//   // send response with some data (a string)
//   let index = request.params.index
//   response.send(obj.pokemon[index].weight);
// });

// app.get('/c/:temp/f', (request, response) => {

//   let cTemp = parseInt(request.params.temp)
//   let converted = (cTemp * 9/5) + 32

//   response.send(`${cTemp} celsius is ${converted} fahrenheit!`)
// });


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));