const express = require('express');

const jsonfile = require('jsonfile');

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

app.get('/', (request,response)=>{
    response.send('地獄へようこそ');
})


app.get('/pokemon/:bitch', (request, response) => {
let i = 0
    jsonfile.readFile('pokedex.json', (err, obj) => {

        let biJes = obj.pokemon;
        biJes.forEach((pokemon)=>{
            let bijName = pokemon.name

            if(request.params.bitch === bijName.toLowerCase()){
                                i++;
                                response.send(` shut up ${bijName} huh???? ${pokemon.weight} adoignoadin ${pokemon.egg} bijlord ${pokemon.weight}`);
                            }
                        })
            if(i===0){
                response.status(403).send("bij");
            }

        })
        })

app.get('/type/:megaBij', (request,response)=>{
biJes = [];
    jsonfile.readFile('pokedex.json', (err, obj) => {
    //bijlord is one big array with element being an object for each pokemon out there
    let biJlord = obj.pokemon;
    let biJJy = request.params.megaBij;
            biJlord.forEach((tryst)=>{
                //assigning the name of each pokemon to poke name each time foreach is run
                    let pokemonName = tryst.name
                    // assigning the type of that pokemon to biJJes
                    let biJJes = tryst.type
                    // match the pokemon type to the entry type in the URL wtf can be [a,b]
                    biJJes.forEach((wtf)=>{
                        if(wtf.toLowerCase() === biJJy.toLowerCase()){
                            biJes.push(pokemonName);
                        }
                    })

            })
            response.send(biJes)
        })
})

app.get('/weaknesses/:megaBij', (request,response)=>{
biJes = [];
    jsonfile.readFile('pokedex.json', (err, obj) => {
    //bijlord is one big array with element being an object for each pokemon out there
    let biJlord = obj.pokemon;
    let biJJy = request.params.megaBij;
            biJlord.forEach((tryst)=>{
                //assigning the name of each pokemon to poke name each time foreach is run
                    let pokemonName = tryst.name
                    // assigning the type of that pokemon to biJJes
                    let biJJes = tryst.weaknesses
                    // match the pokemon type to the entry type in the URL wtf can be [a,b]
                    biJJes.forEach((wtf)=>{
                        if(wtf.toLowerCase() === biJJy.toLowerCase()){
                            biJes.push(pokemonName);
                        }
                    })

            })
            response.send(biJes)
        })
})

app.get('/nextevolution/:megaBij', (request,response)=>{
biJes = [];
let i=0
    jsonfile.readFile('pokedex.json', (err, obj) => {
    //bijlord is one big array with element being an object for each pokemon out there

    const biJlord = obj.pokemon;
    const biJJy = request.params.megaBij;
            biJlord.forEach((tryst)=>{
                //assigning the name of each pokemon to poke name each time foreach is run
                    let pokemonName = tryst.name
                    // assigning the type of that pokemon to biJJes
                    let biJJes = tryst.next_evolution
                    // match the pokemon type to the entry type in the URL wtf can be [a,b]
                    if (tryst.next_evolution === undefined){
                        i++;
                        return;
                    }
                    if (biJJy.toLowerCase()=== pokemonName.toLowerCase()){
                    biJJes.forEach((wtf)=>{

                            biJes.push(wtf.name);

                    })}

            })
            if (biJes.length === 0){
                response.send(`no such shit la`)
            }else{ response.send(biJes)}
        })
})


  // send response with some data (a string)


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
