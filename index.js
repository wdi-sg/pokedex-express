
const express = require('express');
const jsonfile = require('jsonfile');

const pokedexDataFile = './pokedex.json';

// const jsonfile = require('jsonfile');

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


app.get('/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {

        obj.pokemon.forEach(pokemon => {

            if (pokemon.id == req.params.x) {
                res.send(
                `
                    <img src="${pokemon.img}" width="90px"><br>
                    This is <b>${pokemon.name}</b><br>
                    Height: ${pokemon.height}<br>
                    Weight: ${pokemon.weight}<br>
                    Types: ${pokemon.type.toString()}
                `
                    );
                return;
            }
        })
    })

})

app.get('/pokemon/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {

        let pokemonExists = false;

        obj.pokemon.forEach(pokemon => {

            if (pokemon.name.toLowerCase() == req.params.x.toLowerCase()) {

                res.send(
                `
                <img src="${pokemon.img}" width="90px"><br>
                This is <b>${pokemon.name}</b><br>
                Height: ${pokemon.height}<br>
                Weight: ${pokemon.weight}<br>
                Types: ${pokemon.type.join(", ")}
                `
                    );

                pokemonExists = true;
            }
        })

        if (!pokemonExists) {
            res.status(404).send(`<h1>Could not find information about ${req.params.x}, is that a new Pokemon?</h1>`)
        }
    })

})

app.get('/type/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {

        let pokemonTypeExists = false;
        let pokemonList = "";

        obj.pokemon.forEach(pokemon => {

            if (pokemon.type.map(x => x.toLowerCase()).includes(req.params.x.toLowerCase())) {
                pokemonList +=
                `
                <br>
                <img src="${pokemon.img}" width="90px"><br>
                This is <b>${pokemon.name}</b><br>
                Height: ${pokemon.height}<br>
                Weight: ${pokemon.weight}<br>
                Types: ${pokemon.type.join(", ")}
                <br>
                `

                pokemonTypeExists = true;
            }
        })

        if (!pokemonTypeExists) {
            res.status(404).send(`<h1>Could not find information about ${req.params.x} type of Pokemon, is that a new Pokemon type?</h1>`)
        } else {
            res.send(pokemonList);
        }
    })
})

app.get('/weaknesses/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {

        let pokemonWeaknessExists = false;
        let pokemonList = "";

        obj.pokemon.forEach(pokemon => {

            if (pokemon.weaknesses.map(x => x.toLowerCase()).includes(req.params.x.toLowerCase())) {
                pokemonList +=
                `
                <br>
                <img src="${pokemon.img}" width="90px"><br>
                This is <b>${pokemon.name}</b><br>
                Height: ${pokemon.height}<br>
                Weight: ${pokemon.weight}<br>
                Types: ${pokemon.type.join(", ")}<br>
                Weaknesses: ${pokemon.weaknesses.join(", ")}
                <br>
                `

                pokemonWeaknessExists = true;
            }
        })

        if (!pokemonWeaknessExists) {
            res.status(404).send(`<h1>Could not find information about ${req.params.x} type of Pokemon, is that a new Pokemon type?</h1>`)
        } else {
            res.send(pokemonList);
        }
    })
})

app.get('/nextevolution/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {


        let pokemonExists = false;
        let pokemonList = "";

        obj.pokemon.forEach(pokemon => {

            if (pokemon.name.toLowerCase() == req.params.x.toLowerCase() && pokemon["next_evolution"][0]) {

                let nextEvo = [];

                pokemon["next_evolution"].forEach(pk => nextEvo.push(pk.name))


                res.send(
                `
                <img src="${pokemon.img}" width="90px"><br>
                This is <b>${pokemon.name}</b><br>
                Height: ${pokemon.height}<br>
                Weight: ${pokemon.weight}<br>
                Types: ${pokemon.type.join(", ")}<br>
                Next Evolutions: ${nextEvo.join(", ")}
                <br>
                `
                );
            }

            if (pokemon.name.toLowerCase() == req.params.x.toLowerCase()) {
                pokemonExists = true
            }
        })

        if (!pokemonExists) {
            res.status(404).send(`<h1>Could not find information about ${req.params.x}, is that a new Pokemon?</h1>`)
        }
    })
})

app.get('/prevevolution/:x', (req, res) => {

    jsonfile.readFile(pokedexDataFile, (err, obj) => {


        let pokemonExists = false;
        let pokemonList = "";

        obj.pokemon.forEach(pokemon => {

            if (pokemon.name.toLowerCase() == req.params.x.toLowerCase() && pokemon["prev_evolution"][0]) {

                let prevEvo = [];

                pokemon["prev_evolution"].forEach(pk => prevEvo.push(pk.name))


                res.send(
                `
                <img src="${pokemon.img}" width="90px"><br>
                This is <b>${pokemon.name}</b><br>
                Height: ${pokemon.height}<br>
                Weight: ${pokemon.weight}<br>
                Types: ${pokemon.type.join(", ")}<br>
                Previous Evolutions: ${prevEvo.join(", ")}
                <br>
                `
                );
            }

            if (pokemon.name.toLowerCase() == req.params.x.toLowerCase()) {
                pokemonExists = true
            }
        })

        if (!pokemonExists) {
            res.status(404).send(`<h1>Could not find information about ${req.params.x}, is that a new Pokemon?</h1>`)
        }
    })
})

app.get("/", (req, res) => {
    res.send('Welcome to the online Pokedex!');
})

// app.get('*', (req, res) => {
//   // send response with some data (a string)
//   res.send(req.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */


 let mon = results[0];
  let evolvesFrom = mon.prev_evolution;
  if (!evolvesFrom) {
    res.status(404).send("This Pokemon doesn't evolve from anything!");
  }

  evolvesFrom = evolvesFrom.map(function (mon) {
    return `<a href='../pokemon/${mon.name.toLowerCase()}'>` +
      `${mon.num}: ${mon.name}</a>`;
  });
  evolvesFrom.unshift(
    `These are the Pokemon that evolve into ` +
    `${req.params.end[0].toUpperCase()}${req.params.end.slice(1)}!`);
  res.send(evolvesFrom.join('<br>'));
});

app.get('*', (req, res) => {
  // send res with some data (a string)
  res.send("Welcome to the online Pokedex! You might want to try " +
           "<a href='list'>browsing the main list</a>!");
});
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));