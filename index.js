const express = require('express');
const jsonfile = require('jsonfile');
const dexData = "pokedex.json"
// const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

// Init express app
const app = express();

function borderSide(string) {
    const rowSpace = "     ++                                                                                                ++";
    const borderPadding = "     ";
    const border = "++";
    const textInside = string;
    const spaceInsideRow = (rowSpace.length)-(borderPadding.length)-(border.length)-(border.length)-(textInside.length);

    let x = spaceInsideRow/2;

    let emptySpace = " ";
    const spaceBetween = emptySpace.repeat(x)

    const row = borderPadding+border+spaceBetween+textInside+spaceBetween+border;
    return row;
};
function borderTopBottom() {
    const row = "     ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++";
    return row;
};
function borderEmptyRow() {
    const row = "     ++                                                                                                ++";
    return row;
};
function pokedexBanner() {
    const rowA = borderSide("██████╗  ██████╗ ██╗  ██╗███████╗██████╗ ███████╗██╗  ██╗ ");
    const rowB = borderSide("██╔══██╗██╔═══██╗██║ ██╔╝██╔════╝██╔══██╗██╔════╝╚██╗██╔╝ ");
    const rowC = borderSide("██████╔╝██║   ██║█████╔╝ █████╗  ██║  ██║█████╗   ╚███╔╝  ");
    const rowD = borderSide("██╔═══╝ ██║   ██║██╔═██╗ ██╔══╝  ██║  ██║██╔══╝   ██╔██╗  ");
    const rowE = borderSide("██║     ╚██████╔╝██║  ██╗███████╗██████╔╝███████╗██╔╝ ██╗ ");
    const rowF = borderSide("╚═╝      ╚═════╝ ╚═╝  ╚═╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ");

    // const rowG = borderSide(" ▄▄·  ▄ .▄            .▄▄ · ▄▄▄ .     ▄· ▄▌      ▄• ▄▌▄▄▄       ▄▄▄·      ▄ •▄ ▄▄▄ .• ▌ ▄ ·.        ▐ ▄ ");
    // const rowH = borderSide("▐█ ▌▪██▪▐█▪     ▪     ▐█ ▀. ▀▄.▀·    ▐█▪██▌▪     █▪██▌▀▄ █·    ▐█ ▄█▪     █▌▄▌▪▀▄.▀··██ ▐███▪▪     •█▌▐█");
    // const rowI = borderSide("██ ▄▄██▀▐█ ▄█▀▄  ▄█▀▄ ▄▀▀▀█▄▐▀▀▪▄    ▐█▌▐█▪ ▄█▀▄ █▌▐█▌▐▀▀▄      ██▀· ▄█▀▄ ▐▀▀▄·▐▀▀▪▄▐█ ▌▐▌▐█· ▄█▀▄ ▐█▐▐▌");
    // const rowJ = borderSide("▐███▌██▌▐▀▐█▌.▐▌▐█▌.▐▌▐█▄▪▐█▐█▄▄▌     ▐█▀·.▐█▌.▐▌▐█▄█▌▐█•█▌    ▐█▪·•▐█▌.▐▌▐█.█▌▐█▄▄▌██ ██▌▐█▌▐█▌.▐▌██▐█▌");
    // const rowK = borderSide("·▀▀▀ ▀▀▀ · ▀█▄▀▪ ▀█▄▀▪ ▀▀▀▀  ▀▀▀       ▀ •  ▀█▄▀▪ ▀▀▀ .▀  ▀    .▀    ▀█▄▀▪·▀  ▀ ▀▀▀ ▀▀  █▪▀▀▀ ▀█▄▀▪▀▀ █▪");


    const rowSpace = borderEmptyRow();
    const row = borderTopBottom();

    const msg = row+"<br>"+rowSpace+"<br>"+rowA+"<br>"+rowB+"<br>"+rowC+"<br>"+rowD+"<br>"+rowE+"<br>"+rowF+"<br>"+rowSpace+"<br>"+row+"<br>";
    //const instruction = rowSpace+"<br>"+rowG+"<br>"+rowH+"<br>"+rowI+"<br>"+rowJ+"<br>"+rowK+"<br>"+rowSpace+"<br>"+row;
    console.log("alsdaslnfjnaslkjcanscjnajsnld")
    return msg
};
function indexMsg() {
    const msg = "<ul><li><a href='/'>index</a></li><ul><li><a href='/pokedex'>pokedex</a></li></ul></ul>";
    return msg
};

function monImg(imgsrc){
    const img = `<img src='${imgsrc}'>`
    return img
}

function getMonsByType(data, type){
    const byType = type
    console.log(byType)
    const db = data["pokemon"]
    let monsByType = [];
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        db[i]["type"].forEach(index => {
            if(index == byType){
                console.log("Yay!")
                monsByType.push(db[i]["name"])
            }
        });
    }
    return monsByType
};
function getDeetsByName(data, pokemon){
    const byName = pokemon
    const db = data["pokemon"]
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        if (db[i]["name"] === byName){
            return db[i]
        }
    }
};
function getImgByName(data, pokemon){
    const byName = pokemon
    const db = data["pokemon"]
    //console.log(db[0]["name"])
    for (let i = 0; i < db.length; i++) {
        if (db[i]["name"] === byName){
            const img = monImg(db[i]["img"])
            return img
        }
    }
};
app.get('/', (request, response) => {
    const msg = indexMsg()
  // send response with some data (a string)
  response.send(`<html><body><div><pre>${msg}</pre></div></body></html>`);
});
app.get('/pokedex', (request, response) => {
    const banner = pokedexBanner()
  // send response with some data (a string)
  response.send(`<html><body><div><pre>${banner}</pre></div></body></html>`);
});


jsonfile.readFile(dexData, (err, obj) => {

    app.get('/pokedex/:name', (request, response) => {
        const monName = request.params.name;
        const fullDeets = getDeetsByName(obj, monName);

        if(!fullDeets) response.send("Denied!");
        console.log("YAS!")
        response.send(fullDeets);
    });
    app.get('/pokedex/img/:name', (request, response) => {
        const monName = request.params.name;
        const img = getImgByName(obj, monName);
        if(!img) response.send("Denied!");
        console.log("YAS!")
        response.send(img);
    });
    app.get('/pokedex/type/:type', (request, response) => {
        const monType = request.params.type;
        const monsByType = getMonsByType(obj, monType);

        if(!monsByType) response.send("Denied!");
        console.log("YAS!")
        response.send(monsByType);
    });

    if (err) console.error(err);
});



/**
 * ===================================
 * Routes
 * ===================================
 */




// app.get('/pokedex/:name', (request, response) => {

//     if(request.params.name === "bulbasaur"){
//         response.send("yes");
//     } else if(request.params.name === "ditto") {
//         response.send("no");
//     }

//     var x = getWeight()
//     console.log(x)

//     console.log("000000000000000000000000")
//   // send response with some data (a string)
//   //response.send(request.path);
// });

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));