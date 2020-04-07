const express = require('express');
const app = express();
const jsonfile = require('jsonfile');
const PORT = 3000;
const file = "./pokedex.json";

const getData = async () => {
  return await jsonfile.readFile(file);
};

const getPokemonById = (id, data) => data.find(item => +item.id === +id);

const getPokemonByName = (name, data) => data.find(item => item.name.toLowerCase() === name.toLowerCase());

const getPokemonsByAttribute = (attribute, attributeName, data) => data.filter(item => {
  const attributes = Array.isArray(item[attributeName]) ?
    item.type.map(type => type.toLowerCase()) : item[attributeName];
  return attributes.includes(attribute.toLowerCase());
});

const sendPokemonNamesWithAttrib = (req, res, attribute) => {
  getData().then(data => {
    const pokemons = getPokemonsByAttribute(req.params.type, attribute, data.pokemon);
    if (!pokemons) {
      return res.status(404).send(`${attribute} ${req.params.type} not found.`);
    }
    const namesWithAttrib = pokemons.reduce((acc, curr) => acc + "\n" + curr.name, "");
    res.send(namesWithAttrib);
  }).catch(e => console.log(e));
};

// Routes
app.get("/", (req, res) => {
  res.send("\"Welcome to the online Pokdex!\"")
});

app.get("/type/:type", (req, res) => {
  sendPokemonNamesWithAttrib(req, res, 'type');
});

app.get("/weakness/:weakness", (req, res) => {
  sendPokemonNamesWithAttrib(req, res, 'weakness');
});

app.get("/pokemon/:id(\\d+$)", (req, res) => {
  getData().then(data => {
    const {name: pokemonName} = getPokemonById(req.params.id, data.pokemon);
    res.send(pokemonName);
  }).catch(e => console.error(e));
});

app.get("/pokemon/:name([a-zA-Z]+$)", (req, res) => {
  getData().then(data => {
    const pokemon = getPokemonByName(req.params.name, data.pokemon);
    if (!pokemon) {
      const errorRes = `Could not find information about ${req.params.name} - 
      Is that a new pokemon? Gotta catch em' all!`;
      return res.status(404).send(errorRes);
    }
    res.send(pokemon.weight);
  }).catch(e => console.error(e));
});

app.listen(PORT, () => console.log(`Sever on port ${PORT}`));


// app.get("/pokemon/:name([a-zA-Z]+$)", (req, res) => {
//   (async function () {
//     const data = await getData();
//     const {pokemon: pokemons} = data;
//     const pokemon = getPokemonByName(req.params.name, pokemons);
//     if (!pokemon) {
//       res.send(`Could not find information about ${req.params.name} - Is that a new pokemon? Gotta catch em' all!`);
//       return res.sendStatus(404);
//     }
//     res.send(pokemon.weight)
//   })();
// });

