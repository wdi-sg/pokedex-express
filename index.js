const express = require('express');

const jsonfile = require('jsonfile');

// Init express app
const app = express();

// const pokedex = jsonfile.readFile('pokedex.json', (err, obj) => {
//     console.log(obj.pokemon[0])
//     return obj.pokemon
// })

// console.log(pokedex)

// app.get('*', (req, res) => {
//     res.send('it works!')
// })

jsonfile.readFile('./pokedex.json', (err, obj) => {
const pokedex = obj.pokemon;
  if (err) {
    console.log(err)
} else {
    app.get('*', (request, response) => {
      const param = request.path.substring(1); // Remove '/' from request
      const payload = [];
      Object.keys(pokedex).forEach((key) => {
        // DELIVERABLE
        if (pokedex[key].name.toLowerCase() === param) {
          payload.push(pokedex[key].name);
          payload.push(pokedex[key].weight);
          response.send(payload);
        }
      });
    });
  }
});

app.listen(3000), () => console.log('~~~ Tuning in to the waves of port 3000 ~~~');