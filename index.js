const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const file = 'pokedex.json';

app.get('/type/:types', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let typeNames = [];
    for (let i=0; i<obj.pokemon.length; i++) {
      for (let j=0; j<obj.pokemon[i].type.length; j++) {
        if (obj.pokemon[i].type[j].toLowerCase() == request.params.types.toLowerCase()) {
          typeNames.push(`- ${obj.pokemon[i].name}<br>`);
        }
      }
    }
    response.send(`All ${request.params.types} type Pokemon are as follow:<br>
    ${typeNames.join("")}`);
  })
})

app.get('/weaknesses/:weaks', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    let weakNames = [];
    for (let i=0; i<obj.pokemon.length; i++) {
      for (let j=0; j<obj.pokemon[i].weaknesses.length; j++) {
        if (obj.pokemon[i].weaknesses[j].toLowerCase() == request.params.weaks.toLowerCase()) {
          weakNames.push(`- ${obj.pokemon[i].name}<br>`);
        }
      }
    }
    response.send(`All Pokemon that has the same ${request.params.weaks} weakness are as follow:<br>
    ${weakNames.join("")}`);
  })
})

app.get("/:pokemon", (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.pokemon.toLowerCase()) {
        let nextEvo = obj.pokemon[i].next_evolution;
        let evoName = [];
        if (nextEvo !== undefined) {
          for (let j=0; j<nextEvo.length; j++) {
            evoName.push(nextEvo[j].name);
          }
        } else {
          evoName.push("N.A. (This is the final evolution for this Pokemon.)")
        }
        response.send(`
        <h1>${obj.pokemon[i].name} #${obj.pokemon[i].num}</h1>
        <div><img src="${obj.pokemon[i].img}"></div><br>
        Height: ${obj.pokemon[i].height}<br>
        Weight: ${obj.pokemon[i].weight}<br>
        Type: ${obj.pokemon[i].type.join(", ")}<br>
        Weakness: ${obj.pokemon[i].weaknesses.join(", ")}<br>
        Next Evolution: ${evoName.join(", ")}
        `);
      };
      if (err) {
        response.status(404);
        response.send(`Could not find information about ${request.params.pokemon} - Is that a new pokemon? Gotta catch em' all!`);
      };
    };
  });
});

app.get('/nextevolution/:next', (request, response) => {
  jsonfile.readFile(file, (err, obj) => {
    for (let i=0; i<obj.pokemon.length; i++) {
      if (obj.pokemon[i].name.toLowerCase() == request.params.next.toLowerCase()) {
        let prevEvo = obj.pokemon[i].prev_evolution;
        let prevEvoName = [];
        if (prevEvo !== undefined) {
          for (let j=0; j<prevEvo.length; j++) {
            prevEvoName.push(`- ${prevEvo[j].name}<br>`);
          }
        }
        if (prevEvo !== undefined) {
          response.send(`The following are the Pokemon that ${request.params.next} evolves from:<br>
          ${prevEvoName.join("")}`)
        } else {
          response.send(`There are no Pokemon that ${request.params.next} evolves from.`)
        }
      }
    }
  })
})

app.get('/', (request, response) => {
  response.send("<h1></h1>Welcome to the online Pokedex!</h1>");
});

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
