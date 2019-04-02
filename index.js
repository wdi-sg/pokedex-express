const jsonfile = require('jsonfile');
const file = 'pokedex.json'

const express = require('express');
const app = express();

//pokemonObj["pokemon"][1]["name"]
jsonfile.readFile(file, (err, pokemonObj) => {
/*     for (let i = 0; i < pokemonObj["pokemon"].length; i++) {
                console.log(pokemonObj["pokemon"][i]["name"].toLowerCase());
}*/
   // console.log(pokemonObj["pokemon"][4]["name"])
    const doWhenRequest = (request, response) => {
        response.send("Welcome to the online Pokdex!");
    };

    app.get('/', doWhenRequest );

    app.get("/:pokemonName", (request, response) => {
        console.log( "request params", request.params);
            let pokemon = request.params.pokemonName;
            response.send(pokemon);


            // length is 151
            for (let i = 0; i < pokemonObj["pokemon"].length; i++) {
                //console.log(pokemonObj["pokemon"][i]["name"]);
                //response.send(pokemon)

                if (pokemon === pokemonObj["pokemon"][i]["name"].toLowerCase()) {
                    let weight = pokemonObj["pokemon"][i]["weight"];

                    response.send(`Pokemon: ${pokemon} \nWeight: ${weight}`)

                } else {    // end of if else statement
                    response.send(404, `Could not find information about ${pokemon} - Is that a new pokemon? Gotta catch em' all!`);
                        //response.send(404, '<html><body><h1>BANANANSSSSS'+num+'</h1></body></html>');
                }
            }  // end of for loop

     //response.send(pokemon)
    });


    app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));

})    // end of read file