const express = require('express');
const json = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

const output = [];

var getHTML = (data) => {

  let html = "";
  html += "<html>";
  html += "<body>";
  html += "<h1>Search results:</h1>";
  html += "<p>" + data + "</p>";
  html += "</body>";
  html += "</html>";

  return html;
}

app.get('/type/:type', (request, response) => {

  console.log(request.params);

  let searchType = request.params.type;

  json.readFile(pokedex, (err, obj) => {


    const pokemon = obj.pokemon;
    let output = [];

    for (let i in pokemon) {
      if (pokemon[i].type.includes(searchType)) {
        output.push(pokemon[i].name);
      }
    }

    response.send(getHTML(output));

    if (err) {
      console.log(err);
    }
  })
})

app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
