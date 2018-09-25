const express = require("express");
const jsonfile = require("jsonfile");

const file = "./pokedex.json";

// Getting the Data from JSON Object
jsonfile.readFile(file, (err, obj) => {
  if (err) {
    console.error(err);
  } else {
    pokedex = obj;
  }
});

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

// Creating root route, calling function to create list of links when navigated to root.
app.get("/", (req, res) => {
  res.send(listPokemon());
});

// Added the /pokemon path so that all other routes except those listed would redirect to the main page
// Also needed the /pokemon path so that the else statement in this route would work concurrently with the other redirect.
app.get("/pokemon/:pokename", (req, res) => {
    let pokemonName = findPokemon(req.params.pokename.toLowerCase())
    // Creating HTML Document to display Pokemon Attributes
    if (pokemonName) {
        var html = "";
         html += "<html>";
         html += "<body>";
         html += "<h1>Pokedex Results</h1>";
         html += "<h3>"+pokemonName.name+"</h3>";
         html += "<h3> height: "+pokemonName.height+"</h3>";
         html += "<h3> weight: "+pokemonName.weight+"</h3>";
         html += "<h3>Types"
         for (i in pokemonName.type) {
             html += "<ul>"+pokemonName.type[i]+"</ul>"
         }
         html += "Weaknesses"
         for (j in pokemonName.weaknesses) {
             html += "<ul>"+pokemonName.weaknesses[j]+"</ul>"
         }
         html += "</h3>"
         html += '<img src="'+pokemonName.img+'"/>';
         html += "</body>";
         html += "</html>";
         res.send(html)
    } else {
        res.send("No Pokemon Found for " + req.params.pokename)
    }
})

app.get("/type/:poketype", (req, res) => {
    let typeResult = findPokemonByType(req.params.poketype);
    let pokeList = "";
    pokeList += "<ol>"
    for (i in typeResult) {
        pokeList += "<li>"
        pokeList += typeResult[i]
        pokeList += "</li>"
    }
    pokeList +="</ol>"
    res.send(pokeList);
})

app.get("/weakness/:weakness", (req, res)=> {
    // Matching the request path to weaknesses
    let weaknessResult = findPokemonByWeakness(req.params.weakness);
    let pokeList = "";
    pokeList += "<ol>"
    for (i in weaknessResult) {
        pokeList += "<li>"
        pokeList += weaknessResult[i]
        pokeList += "</li>"
    }
    pokeList +="</ol>"
    res.send(pokeList);
})
app.get("/nextevolution/:nextevo", (req, res) =>{
    let evolutionResult = findPokemonByNextEvo(req.params.nextevo);
    let pokeList = "";
    pokeList += "<ol>"
    for (i in evolutionResult) {
        pokeList += "<li>"
        pokeList += evolutionResult[i]
        pokeList += "</li>"
    }
    pokeList +="</ol>"
    res.send(pokeList);
})
// Route to search via Query Params for Spawn Chance
app.get("/search/spawn_chance", (req, res) => {
        findPokemonBySpawnChance(req.query.amount)
        // If/Else Conditional to return the greater or smaller array based on the query params.
    if (req.query.compare == "less") {
        res.send(findPokemonBySpawnChance(req.query.amount).smallerArr)
    } else {
        res.send(findPokemonBySpawnChance(req.query.amount).greaterArr)
    }
})
// Route to search via Query Params for Average Spawn
app.get("/search/avg_spawn", (req, res) => {
        findPokemonBySpawnChance(req.query.amount)
        // If/Else Conditional to return the greater or smaller array based on the query params.
    if (req.query.compare == "less") {
        res.send(findPokemonBySpawnChance(req.query.amount).smallerArr)
    } else {
        res.send(findPokemonBySpawnChance(req.query.amount).greaterArr)
    }
})

app.get("*", (req, res) => {
    res.redirect("/")
});

// Create a function to call to create a List of Links of Pokemon
const listPokemon = () => {
    const pokeArray = pokedex.pokemon;
    pokemonLinks = ""
    pokemonLinks += "<html> <body>Welcome to the online Pokedex!<ol>"
    for (i in pokeArray) {
        pokemonLinks += "<li><a href='/pokemon/"+pokeArray[i].name+"'/>" + pokeArray[i].name + "</a></li>"
    }
    pokemonLinks += "</ol></body></html>"
    return pokemonLinks;
}
const findPokemon = pokemonResult => {
  const pokeArray = pokedex.pokemon;
  for (var i = 0; i < pokeArray.length; i++) {
    let pokemon = pokeArray[i];
    if (pokemonResult === pokemon.name.toLowerCase()) {
      return pokemon;
    }
  }
  return undefined;
};

const findPokemonByType = pokemonType => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    for (var j = 0; j < pokeArray[i].type.length; j++) {
      if (pokemonType === pokeArray[i].type[j].toLowerCase()) {
        arr.push(pokeArray[i].name);
      }
    }
  }
  return arr;
};

const findPokemonByWeakness = pokemonWeakness => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    for (var j = 0; j < pokeArray[i].weaknesses.length; j++) {
      if (pokemonWeakness === pokeArray[i].weaknesses[j].toLowerCase()) {
        arr.push(pokeArray[i].name);
      }
    }
  }
  return arr;
};

const findPokemonByNextEvo = pokemonEvo => {
  const pokeArray = pokedex.pokemon;
  let arr = [];
  for (var i = 0; i < pokeArray.length; i++) {
    if (
      pokeArray[i].prev_evolution &&
      pokeArray[i].name.toLowerCase() === pokemonEvo
    ) {
      for (var j = 0; j < pokeArray[i].prev_evolution.length; j++) {
        arr.push(pokeArray[i].prev_evolution[j].name);
      }
    }
  }
  return arr;
};

const findPokemonBySpawnChance = chance => {
    const pokeArray=pokedex.pokemon;
    // Initialize 2 different arrays to place the pokemons into based on whether they are larger or greater
    let greaterArr = []
    let smallerArr = []
    for (i in pokeArray) {
        if (pokeArray[i].spawn_chance >= chance) {
            greaterArr.push(pokeArray[i].name)
        } else {
            smallerArr.push(pokeArray[i].name)
        }
    }
    return {greaterArr, smallerArr}
}

const findPokemonByAvgSpawn = chance => {
    const pokeArray=pokedex.pokemon;
    // Initialize 2 different arrays to place the pokemons into based on whether they are larger or greater
    let greaterArr = []
    let smallerArr = []
    for (i in pokeArray) {
        if (pokeArray[i].avg_spawns >= chance) {
            greaterArr.push(pokeArray[i].name)
        } else {
            smallerArr.push(pokeArray[i].name)
        }
    }
    return {greaterArr, smallerArr}
}

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () =>
  console.log("~~~ Tuning in to the waves of port 3000 ~~~")
);
