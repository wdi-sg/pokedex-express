const express = require('express');

const jsonfile = require('jsonfile');

// Init express app
const app = express();

jsonfile.readFile('./pokedex.json', (err, obj) => {

const pokedex = obj.pokemon;

  if (err) {

    console.log(err)

} else {

    app.get('*', (request, response) => {

      const param = request.path.substring(1); // Remove '/' from request

      Object.keys(pokedex).forEach((key) => {

        // DELIVERABLE

        if (pokedex[key].name.toLowerCase() === param) {

          var html = `<html>`;
          html += `<body>`;
          html += `<h1>${pokedex[key].name}</h1><br>`;
          html += `<img src='${pokedex[key].img}'><br>`;
          html += `Type: ${pokedex[key].type}<br>`;
          html += `Height: ${pokedex[key].height}<br>`;
          html += `Weight: ${pokedex[key].weight}<br>`;
          html += `Candy: ${pokedex[key].candy}<br>`;
          html += `Candy Count: ${pokedex[key].candy_count}<br>`;
          html += `Egg: ${pokedex[key].egg}<br>`;
          html += `Spawn Chance: ${pokedex[key].spawn_chance}<br>`;
          html += `Avg Spawns: ${pokedex[key].avg_spawns}<br>`;
          html += `Spawn Time: ${pokedex[key].spawn_time}<br>`;
          html += `Multipliers: ${pokedex[key].multipliers}<br>`;
          html += `Weaknesses: ${pokedex[key].weaknesses}<br>`;
          html += `Next Evolution: ${pokedex[key].next_evolution[0].name}<br>`;

          response.send(html);
        }
      });
    });
  }
});

app.listen(3000), () => console.log('~~~ Tuning in to the waves of port 3000 ~~~');