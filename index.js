const express = require('express');

const jsonfile = require('jsonfile');
const file = 'pokedex.json'

const app = express();

//if no path typed after pokemon
app.get('/pokemon/', (request, response) => {

    response.send("Welcome to the Pokedex! What Pokemon are you looking for?")

})

//search for specific pokemon name
app.get('/pokemon/:name', (request, response) => {

  let pokeName = request.params.name
  let pokeFound = false

    jsonfile.readFile(file, (err, obj) => {

        console.log("reading")

        for (let i=0; i<obj.pokemon.length; i++){

            let dataName = obj.pokemon[i].name
            let dataIndex = obj.pokemon[i]

            if (pokeName === dataName || pokeName === dataName.toLowerCase() ){
                response.send(`This is ${pokeName}! ${pokeName}'s ID number is ${dataIndex.id}. ${pokeName}'s height is ${dataIndex.height} and ${pokeName}'s weight is ${dataIndex.weight}.`)
                pokeFound = true
            }
        }

        if (pokeFound === false){
        response.status(404).send (`Could not find information about ${pokeName}. Is that a new Pokemon? Gotta catch em' all!`)
        }

        jsonfile.writeFile(file, obj, {spaces:2},(err) => {
        console.log(err)
        });
    });

});

//search for pokemon type
app.get('/pokemon/type/:pokeType', (request,response) => {

    let type = request.params.pokeType


    jsonfile.readFile(file, (err,obj)=> {

        let namePokeTypes = []

        for (let i=0; i<obj.pokemon.length; i++){


              let typeIndex = obj.pokemon[i]

            for (let j=0; j<obj.pokemon[i]["type"].length; j++){

                let someType = obj.pokemon[i]["type"][j]

                 if(type === someType || type === someType.toLowerCase()){

                    // console.log(typeIndex.name)
                    namePokeTypes.push( typeIndex.name )

                }
            }
        }
    let pokeList = namePokeTypes.join(", ")
    console.log (pokeList)
    response.send(`Here are other Pokemon of type ${type}:
                        ${pokeList}`)
    })
})

//search for pokemon weakness
app.get('/pokemon/weaknesses/:pokeWeak', (request,response) => {

    let weakness = request.params.pokeWeak


    jsonfile.readFile(file, (err,obj)=> {

        let namePokeWeak = []

        for (let i=0; i<obj.pokemon.length; i++){

              let typeIndex = obj.pokemon[i]

            for (let j=0; j<obj.pokemon[i]["weaknesses"].length; j++){

                let someWeak = obj.pokemon[i]["weaknesses"][j]

                 if(weakness === someWeak || weakness === someWeak.toLowerCase()){

                    // console.log(typeIndex.name)
                    namePokeWeak.push( typeIndex.name )

                }
            }
        }
    let pokeList = namePokeWeak.join(", ")
    console.log (pokeList)
    response.send(`Here are other Pokemon with a weakness of ${weakness}:
                        ${pokeList}`)
    })
})

//search for pokemon original form
app.get('/pokemon/nextevolution/:evolution', (request,response) => {

    let evolved = request.params.evolution

    let pokeOrigin = []

    let evolveIndex;

    let prevEvolution = false

    jsonfile.readFile(file, (err,obj)=> {

        for (let i=0; i<obj.pokemon.length;i++){
            if (evolved === obj.pokemon[i].name || evolved === obj.pokemon[i].name.toLowerCase() ){
                evolveIndex = obj.pokemon[i]

                  if (evolveIndex.hasOwnProperty('prev_evolution') === true){
                        prevEvolution = true
                    for (let j=0; j<evolveIndex["prev_evolution"].length; j++){

                        // pokeOrigin.push(evolveIndex["prev_evolution"][j]["name"])
                        let originName = evolveIndex["prev_evolution"][j]["name"]

                        pokeOrigin.push(originName)


                    }
                    let pokeList = pokeOrigin.join(", ")
                     console.log (pokeList)
                    response.send(`Here are the Pokemon that ${evolved} has evolved from:
                        ${pokeList}`)
                }
            }
        }

        if (prevEvolution === false){
         response.send (`${evolved} did not evolve from any other Pokemon.`)
        }




    })
})








app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));