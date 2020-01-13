const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const pokemonData = 'pokedex.json';


app.get('/pokemon/:iden', (request, response) => {
    let idenNum = parseInt(request.params.iden);
    jsonfile.readFile(pokemonData, (err, obj) => {
        if (idenNum > 0) {
            let pokemon = obj.pokemon[idenNum-1];
            if (pokemon !==  undefined) {
                response.send("Name : " + pokemon.name + "<br>Weight : " + pokemon.weight);
            } else {
                response.redirect(301, "/");
            } //else 1 close
        } else {
            let iden = request.params.iden;
            let pokedex = obj.pokemon;
            let count = 0;
            for (i = 0; i < pokedex.length; i++) {
                if (iden.toLowerCase() == pokedex[i].name.toLowerCase()) {
                    response.send("Name : " + pokedex[i].name + "<br>Weight : " + pokedex[i].weight);
                } else {
                    count++
                }
                if (count == pokedex.length) {
                    response.send("Unable to find pokemon with that name. Please Try again");
                }
            }//for loop end
        }// number check else end
    })//readFile end
})//app.get end


//catch all if wrong input is entered
app.get('*', (request, response) => {
    response.send("Type /pokemon/'number or name' in the address bar");
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));