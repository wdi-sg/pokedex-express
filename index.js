const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const pokemonData = 'pokedex.json';



/*app.get('/pokemon/:index', (request, response) => {
    let index = parseInt(request.params.index) - 1;
    jsonfile.readFile(pokemonData, (err, obj) => {
        let pokemon = obj.pokemon[index]
        if (pokemon !== null) {
            response.send("Name : " + pokemon.name + "<br>Weight : " + pokemon.weight);
        } else {
            response.redirect(404, "/pokemon")
        }
    })
});*/

app.get('/pokemon/:iden', (request, response) => {
    if (parseInt(request.params.iden) !== NaN) {
        let index = parseInt(request.params.iden) -1;
        jsonfile.readFile(pokemonData, (err, obj) => {
            let pokemon = obj.pokemon[index];
            if (pokemon !==  undefined) {
                response.send("Name : " + pokemon.name + "<br>Weight : " + pokemon.weight);
            } else {
                console.log(parseInt(request.params.iden));
                response.redirect(404, "/pokemon");
            }//else statement
        })//readFile closing
    } else {
        response.send("This ends here for now");
    }//else statement. this should execute if path is not a number
})//app.get end






app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));