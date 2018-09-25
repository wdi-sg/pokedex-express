const express = require('express');
const json = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

const capitalise = (string) => {
  return string.charAt(0).toUpperCase() + string.substr(1).toLowerCase();
}

const searchBy = (parameter, search, data) => {

  let html = "";
  html += "<html>";
  html += "<body>";
  html += "<div class='container'>";
  html += `<h1>Search results for ${parameter}: ${search} </h1>`;
  html += "<ol>";

  for (let i in data) {
    if (data[i][parameter].includes(search)) {
      html += "<li><a href=\"/" + data[i].name + "\">" + data[i].name + "</li>";
    }
  }

  html += "</ol>";
  html += "</div>";
  html += "</body>";
  html += "<style> body {font-family: sans-serif; background-color: grey;} .container {width: 60vw; border: 1px solid white; background-color: white; border-radius:15px; margin: 0 auto; padding: 2vh 2vw} li {margin: 0.5vh}</style>";
  html += "</html>";

  return html;
}

app.get('/type/:type', (request, response) => {

  let search = capitalise(request.params.type);

  json.readFile(pokedex, (err, obj) => {

    let results = searchBy("type", search, obj.pokemon);
    response.send(results);

    if (err) {
      console.log(err);
    }
  })
})

app.get('/weaknesses/:weaknesses', (request, response) => {

  let search = capitalise(request.params.weaknesses);

  json.readFile(pokedex, (err, obj) => {

    let results = searchBy("weaknesses", search, obj.pokemon);
    response.send(results);

    if (err) {
      console.log(err);
    }
  })
})


app.get('/evolvesto/:evolvesto', (request, response) => {

  let search = capitalise(request.params.evolvesto);

  json.readFile(pokedex, (err, obj) => {

    let output = [];

    for (let i in obj.pokemon) {
      if (obj.pokemon[i].name === search) {
        if (obj.pokemon[i].prev_evolution) {
          for (let y in obj.pokemon[i].prev_evolution) {
            output.push(obj.pokemon[i].prev_evolution[y].name);
          }
        }
      }
    }

    if (output.length > 0) {

      let html = "";
      html += "<html>";
      html += "<body>";
      html += "<div class='container'>";
      html += "<h1>Previous evolutions of " + search + "</h1>";
      html += "<ol>";

      for (let i in output) {
          html += "<li><a href=\"/" + output[i] + "\">" + output[i] + "</li>";
      }

      html += "</ol>";
      html += "</div>";
      html += "</body>";
      html += "<style> body {font-family: sans-serif; background-color: grey;} .container {width: 60vw; border: 1px solid white; background-color: white; border-radius:15px; margin: 0 auto; padding: 2vh 2vw} li {margin: 0.5vh}</style>";
      html += "</html>";

      response.send(html);

    } else {
      response.status(404);
      response.redirect("/");
    }

    if (err) {
      console.log(err);
    }
  })
})

// last further
app.get('/search/:filter*', (request, response) => {

  json.readFile(pokedex, (err, obj) => {

    let filter = request.params.filter.toLowerCase();
    let amount = request.query.amount;
    let compare = request.query.compare.toLowerCase();

    let output = [];

    for (let i in obj.pokemon) {

      let pokeValue = obj.pokemon[i][filter].toString();

      // spawn_time is stored in ("mm:ss");
      // this strips it and converts it into seconds
      // otherwise removes 'm' and 'kg' from height and weight
      if (filter === "spawn_time") {
        pokeValue = pokeValue.split(":");
        pokeValue = parseInt(pokeValue[0])*60 + parseInt(pokeValue[1]);
      } else {
        pokeValue = pokeValue.replace(/"m"|"kg"/gi,"");
        pokeValue = parseFloat(pokeValue);
      }


      if (compare === "less") {
        if (pokeValue < amount) {
          output.push(obj.pokemon[i].name);
        }
      } else if (compare === "more") {
        if (pokeValue > amount) {
          output.push(obj.pokemon[i].name);
        }
      }
    }

    let html = "";
    html += "<html>";
    html += "<body>";
    html += "<div class='container'>";
    html += `<h1>Search results for ${filter} ${compare} than ${amount}:</h1>`;
    html += "<ol>";

    for (let i in output) {
      html += "<li><a href=\"/" + output[i] + "\">" + output[i] + "</li>";
    }

    html += "</ol>";
    html += "</div>";
    html += "</body>";
    html += "<style> body {font-family: sans-serif; background-color: grey;} .container {width: 60vw; border: 1px solid white; background-color: white; border-radius:15px; margin: 0 auto; padding: 2vh 2vw} li {margin: 0.5vh}</style>";
    html += "</html>";

    if (output.length > 0) {
      response.send(html);
    } else {
      response.send("No results found!");
    }

    if (err) {
      console.log(err);
    }
  })
})

// search by Pokemon
app.get('/:pokemon', (request, response) => {

  let search = capitalise(request.params.pokemon);

  json.readFile(pokedex, (err, obj) => {

    let target = "";

    for (let i in obj.pokemon) {
      if (obj.pokemon[i].name === search) {
        target = obj.pokemon[i];
        break;
      }
    }

    if (target) {

      let html = "";
      html += "<html>";
      html += "<body>";
      html += "<div class='container'>";
      html += "<h1>" + target.name + "</h1>";
      html += `<img src='${target.img}'>`;
      html += "<ul>";
      html += "<li>Type:<ul>";

      for (let i in target.type) {
        html += "<li>" + target.type[i] + "</li>";
      }

      html += "</ul></li>";
      for (let i in Object.keys(target)) {
        let key = Object.keys(target)[i];
        if (key !== "type" && key !== "img" && key !== "num" && key !== "name") {
          html += "<li>" + key + " : " + target[key] + "</li>";
        }
      }
      html += "</div>";
      html += "</body>";
      html += "<style> body {font-family: sans-serif; background-color: grey;} .container {width: 60vw; border: 1px solid white; background-color: white; border-radius:15px; margin: 0 auto; padding: 2vh 2vw} li {margin: 0.5vh}</style>";
      html += "</html>";

      response.send(html);

    } else {
      response.status(404);
      response.redirect("/");
    }

    if (err) {
      console.log(err);
    }
  })

})

// List all Pokemon if blank search
app.get('/', (request, response) => {

  json.readFile(pokedex, (err, obj) => {

    let html = "";
    html += "<html>";
    html += "<body>";
    html += "<div class='container'>";
    html += "<h1>Pokedex</h1>";
    html += "<ol>";

    for (let i in obj.pokemon) {
      html += "<li><a href=\"/" + obj.pokemon[i].name + "\">" + obj.pokemon[i].name + "</li>";
    }

    html += "</ol>";
    html += "</div>";
    html += "</body>";
    html += "<style> body {font-family: sans-serif; background-color: grey;} .container {width: 60vw; border: 1px solid white; background-color: white; border-radius:15px; margin: 0 auto; padding: 2vh 2vw} li {margin: 0.5vh}</style>";
    html += "</html>";

    response.send(html);

    if (err) {
      console.log(err);
    }
  })
})

app.listen(3000, () => console.log("Listening on port: 3000"));
