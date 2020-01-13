const express = require('express');
const jsonfile = require('jsonfile');
const app = express();
const pokemonData = 'pokedex.json';



/*app.get('/pokemon/:iden', (request, response) => {
    console.log(parseInt(request.params.iden));
    if (parseInt(request.params.iden) != NaN) {
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
        console.log("Why isn't this happening?")
        response.send("This ends here for now");
    }//else statement. this should execute if path is not a number
})//app.get end
*/
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
            response.send("This is a string input. Probably")
        }
    })//readFile end
})//app.get end

app.get('*', (request, response) => {
    response.send("Type /pokemon/'number or name' in the address bar");
})



app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));