const express = require("express");

const jsonfile = require('jsonfile');

// Init express app
const app = express();

// deliverables
// app.get('/pokemon/:pokemon', (request, response) => {
//   jsonfile.readFile("pokedex.json", (err, obj) => {
//     obj.pokemon.forEach(poke => {
//       if (poke.name.toLowerCase() === request.params.pokemon) {
//         response.send(`${poke.name} is weighed ${poke.weight}`);
//       }
//     })
//   })
// });

// 1st further
// app.get("/pokemon/:pokemon", (request, response) => {
//   let i = 0;
//   jsonfile.readFile("pokedex.json", (err, obj) => {
//     obj.pokemon.forEach(poke => {
//       if (poke.name.toLowerCase() === request.params.pokemon) {
//         i++; 
//         response.send(
//           `This is ${poke.name}, he is ${poke.weight} in weight!`)
//       }
//     });
//       if (i === 0) {
//         response.status(404).send(`Could not find information about ${request.params.pokemon} - Is that a new Pokemon? Gotta catch em' all!`)
//       }
//   })
// });

app.get("", (request, response) => {
  jsonfile.readFile("pokedex.json", (err, obj) => {
    response.send("Welcome to the online Pokedex!")
  })
});

// app.get("/type/:type", (request, response) => {
//   jsonfile.readFile("pokedex.json", (err, obj) => {
//     let types = [];
//     obj.pokemon.forEach(poke => {
//       poke.type.forEach(typeS => {
//         if (typeS.toLowerCase() === request.params.type) {
//           types.push(poke.name);
//         }
//       })
//     })
//     response.send(types);
//   })
// })

// app.get("/weaknesses/:type", (request, response) => {
//   jsonfile.readFile("pokedex.json", (err, obj) => {
//     let types = [];
//     obj.pokemon.forEach(poke => {
//       poke.weaknesses.forEach(weakness => {
//         if (weakness.toLowerCase() === request.params.type) {
//           types.push(poke.name);
//         }
//       })
//     })
//     response.send(types);
//   })
// })

app.get("/nextevolution/:pokemon", (request, response) => {
  jsonfile.readFile("pokedex.json", (err, obj) => {
    let nextEvo = [];
    obj.pokemon.forEach(poke => {
      if (poke.name.toLowerCase() === request.params.pokemon) {
        if (poke.next_evolution) {
          poke.next_evolution.forEach(next => {
            nextEvo.push(next.name)
          })
        }
      }
    })
    if (nextEvo.length === 0) {
      response.send(`It's at the max evolution!`)
    } else {
      response.send(nextEvo);
    }
  })
})


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
