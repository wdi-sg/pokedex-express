function swap(array, i, j) {
    if (i != j) {
        var swap = array[i];
        array[i] = array[j];
        array[j] = swap;
    }
}

function permute_rec(res, str, array) {
    if (array.length == 0) {
        res.push(str);
    } else {
        for (var i = 0; i < array.length; i++) {
            //swap(array, 0, i);
            permute_rec(res, str + "_" +array[0], array.slice(1));

            //swap(array, 0, i);
        }
    }
}

function xpermute_rec(res, sub, array) {
    if (array.length == 0) {
        if (sub.length > 0) permute_rec(res, "", sub);
    } else {
        xpermute_rec(res, sub, array.slice(1));
        xpermute_rec(res, sub.concat(array[0]), array.slice(1));
    }
}

function xpermute(array) {
    var res = [];

    xpermute_rec(res, [], array);
    return res;
}






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

app.get('/weaknesses', (request, response) => {
  response.send('Welcome to the online Pokdex!')
});

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


app.get('/type/*', (request, response) => {
  // send response with some data (a string)
  let something=[];
let someArray=[];
  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    let weaknessCount=0;
    let pokemonTypeCount=0;
    let pokeType=false;
    let checkPoke=true;
    let newOutputString="";
    let outputString="";
    let typeCollect=request.params[0].split("/");
    something=xpermute(typeCollect);
    something=something.filter((item,index)=>something.indexOf(item)===index);
    console.log(something);
    for(let i=0; i<something.length;i++)
    {
        let somevalue=something[i].split("_");
        somevalue.shift();
        someArray.push(somevalue);

    }
    //console.log(someArray);

    for(let outerloop=0; outerloop<someArray.length; outerloop++)
    {
        newOutputString+="<ol>Pokemons with type/s for "
        for(let innerloop=0; innerloop<someArray[outerloop].length; innerloop++)
        {
            newOutputString +=someArray[outerloop][innerloop]+", ";
        }


        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
            {
        //console.log("something happened");
        let check=0;
                for(pokemonTypeCount=0;pokemonTypeCount<obj["pokemon"][pokemonCount]["type"].length;pokemonTypeCount++)
                        {
                            let checkPoke=true;

                            let innerloop=0;
                            for(innerloop=0; innerloop<someArray[outerloop].length; innerloop++)
                                {
                                    if(someArray[outerloop][innerloop]===obj["pokemon"][pokemonCount]["type"][pokemonTypeCount])
                                    {
                                        pokeType=true;
                                        checkPoke=true;
                                        check++;

                                    }
                                    else
                                    {
                                        checkPoke=false
                                    }
                                }
                                console.log(check);

                        }
                        if(check===someArray[outerloop].length){
                                    newOutputString += `<li>${obj["pokemon"][pokemonCount]["name"]}</li>`;
                                }
                }
                newOutputString+=`</ol>`
        console.log(newOutputString);
    }

    if(pokeType){
                response.send(newOutputString);
                return;
            }
    else
                {
                    response.send("There are no such Type");
                }
/*
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
*/
    });
});


app.get('/weaknesses/*', (request, response) => {
  // send response with some data (a string)
let something=[];
let someArray=[];



  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    let weaknessCount=0;
    let pokemonWeaknessCount=0;
    let weakType=false;
    let checkPoke=true;
    let newOutputString="";
    let outputString="";
    let weaknessCollect=request.params[0].split("/");
    something=xpermute(weaknessCollect);
    something=something.filter((item,index)=>something.indexOf(item)===index);
    console.log(something);
    for(let i=0; i<something.length;i++)
    {
        let somevalue=something[i].split("_");
        somevalue.shift();
        someArray.push(somevalue);

    }
    //console.log(someArray);

    for(let outerloop=0; outerloop<someArray.length; outerloop++)
    {
        newOutputString+="<ol>Pokemons with weakness/es for "
        for(let innerloop=0; innerloop<someArray[outerloop].length; innerloop++)
        {
            newOutputString +=someArray[outerloop][innerloop]+", ";
        }


        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
            {
        //console.log("something happened");
        let check=0;
                for(pokemonWeaknessCount=0;pokemonWeaknessCount<obj["pokemon"][pokemonCount]["weaknesses"].length;pokemonWeaknessCount++)
                        {
                            let checkPoke=true;

                            let innerloop=0;
                            for(innerloop=0; innerloop<someArray[outerloop].length; innerloop++)
                                {
                                    if(someArray[outerloop][innerloop]===obj["pokemon"][pokemonCount]["weaknesses"][pokemonWeaknessCount])
                                    {
                                        weakType=true;
                                        checkPoke=true;
                                        check++;

                                    }
                                    else
                                    {
                                        checkPoke=false
                                    }
                                }
                                console.log(check);

                        }
                        if(check===someArray[outerloop].length){
                                    newOutputString += `<li>${obj["pokemon"][pokemonCount]["name"]}</li>`;
                                }
                }
                newOutputString+=`</ol>`
        console.log(newOutputString);
    }

    if(weakType){
                response.send(newOutputString);
                return;
            }
    else
                {
                    response.send("There are no such weaknesses");
                }



    });
});

app.get('/nextevolution/:pokemon', (request, response) => {
  // send response with some data (a string)


  jsonfile.readFile(file, (err, obj) => {
    let pokemonCount=0;
    let evolutionChain=0;
    let PokeExist=false;
    let EvolveExist=false;
    let outputString=`<ol>The evolution chain of ${request.params.pokemon} is`;

        for(pokemonCount=0;pokemonCount<obj["pokemon"].length;pokemonCount++)
        {

                    if(request.params.pokemon===obj["pokemon"][pokemonCount]["name"])
                    {
                        PokeExist=true;
                        for(const key in obj["pokemon"][pokemonCount])
                        {
                            console.log(key);
                            if(key==="next_evolution")
                            {
                                for(evolutionChain=0;evolutionChain<obj["pokemon"][pokemonCount]["next_evolution"].length;evolutionChain++)
                                {
                                    outputString+=`<li>${obj["pokemon"][pokemonCount]["next_evolution"][evolutionChain].name}</li>`;
                                }
                                outputString+="</ol">
                                response.send(outputString);
                                return;

                            }

                        }
                    }
        }
        if(PokeExist){
            response.send(`There is no evolution for ${request.params.pokemon}`);
                                return;
        }
        response.send(`No such pokemon as ${request.params.pokemon}`);
        return;
    });
});





/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ The local server 3000 is working ~~~'));