const express = require('express');

// const jsonfile = require('jsonfile');
const jsonfile = require('jsonfile');
const file = './pokedex.json';


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

app.get('/', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});

app.get('/pokemon', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});

app.get('/type', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});
/*
app.get('/weaknesses', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});
*/
app.get('/nextevolution', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});

app.get('/pokemon/:id', (request, response) => {
  // send response with some data (a string)


  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    if(!isNaN(parseInt(request.params.id)))
    {
            let pokemonIndex = parseInt(request.params.id) - 1;
            if(pokemonIndex>150)
                {
                response.send("Could not find information about pokemon number"+ request.params.id +" Is that a new pokemon? Gotta catch em' all!");
                return;
                }
            else{
                response.send("The pokemon you are searching is "+ obj["pokemon"][pokemonIndex]["name"] + "and his weight is " + obj["pokemon"][pokemonIndex]["weight"]);
                return;
                }
    }
        else
        {
            //response.send("some Text")
            //console.log(obj["pokemon"][0]["name"]);
            console.log(request.params.id);
            console.log(obj["pokemon"][150]["name"]);
            console.log(obj["pokemon"].length);

            for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
            {
                console.log(pokemonCount);
                    if(request.params.id===obj["pokemon"][pokemonCount]["name"])
                    {
                        console.log("entered");
                        response.send("The pokemon you are searching is "+ obj["pokemon"][pokemonCount]["name"] + " and his weight is " + obj["pokemon"][pokemonCount]["weight"]);
                        return;
                    }

            }
            response.send("Could not find information about " + request.params.id +"- Is that a new pokemon? Gotta catch em' all!");
                        return;
            }


    });
});


app.get('/type/:typing', (request, response) => {
  // send response with some data (a string)


  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    let typeCount=0;
    let typing=false;
    let outputString=`<ol>Type: ${request.params.typing}`;
    //response.send(outputString);
    for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
    {
        //console.log("something happened");
        for(typeCount=0;typeCount<obj["pokemon"][pokemonCount]["type"].length;typeCount++)
        {
            if(request.params.typing===obj["pokemon"][pokemonCount]["type"][typeCount])
            {
                outputString += `<li>${obj["pokemon"][pokemonCount]["name"]}</li>`;
                typing=true;
            }
        }

    }
    if(typing){
        outputString+=`</ol>`
        response.send(outputString);
        return;
    }

    response.send("No pokemon has this type");
                        return;

    });
});


app.get('/weaknesses/*', (request, response) => {
  // send response with some data (a string)


  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    let weaknessCount=0;
    let pokemonWeaknessCount=0;
    let weakType=false;
    let outputString="";
    let weaknessCollect=request.params[0].split("/");
    console.log(weaknessCollect);
    console.log(obj["pokemon"][1]["weaknesses"][1])
    for(weaknessCount=0;weaknessCount<weaknessCollect.length;weaknessCount++)
    {
        outputString+=`<ol>${weaknessCollect[weaknessCount]}`

            for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
            {
        //console.log("something happened");
                for(pokemonWeaknessCount=0;pokemonWeaknessCount<obj["pokemon"][pokemonCount]["weaknesses"].length;pokemonWeaknessCount++)
                        {
                            if(weaknessCollect[weaknessCount]===obj["pokemon"][pokemonCount]["weaknesses"][pokemonWeaknessCount])
                            {
                                outputString += `<li>${obj["pokemon"][pokemonCount]["name"]}</li>`;
                                weakType=true;
                            }
                        }

                }
                outputString+=`</ol>`;
        }
        if(weakType){
                response.send(outputString);
                return;}
                else
                {
                    response.send("There are no such weaknesses");
                }


    });
});

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ The local server 3000 is working ~~~'));