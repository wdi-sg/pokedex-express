let pokeObj;
let result;
var typeArr =[];

const express = require('express');

const jsonfile = require('jsonfile');

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

const file = 'pokedex.json';


// Init express app
const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */
app.get('/', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;
//--------------------------------------------------------------------
            //types of pokemon
           var typesOfPoke = [];

                for(i in pokeObj) {
                    for(j in pokeObj[i].type) {
                        typesOfPoke.push(pokeObj[i].type[j]);
                    }
                };



                typesOfPoke.forEach(function(item) {
                     if(typeArr.indexOf(item) < 0) {
                         typeArr.push(item);
                     }
                });

                console.log(typeArr);
//---------------------------------------------------------------------

    var title = `Welcome to Pokedex!`;
    var html = '';

    html += "<html>";
    html += "<body>";
    html += "<h1>"+title+"</h1>";
    html += '<h2 class="type">Choose by type:</h2>';


    for (i in typeArr) {
        html += '<div><a href="type/'+typeArr[i]+' ">'+typeArr[i].charAt(0).toUpperCase() + typeArr[i].substr(1) +'</a></div>';
    };

    html += '<br />';
    html += '<h2 class="weakness">Choose by weakness:</h2>';

    for (i in typeArr) {
        html += '<div><a href="weakness/'+typeArr[i]+' ">'+typeArr[i].charAt(0).toUpperCase() + typeArr[i].substr(1) +'</a></div>';
    };




    response.status(200);
    response.send(html);

    });
});



app.get('/:name', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

        var req = request.params.name.toLowerCase();

        console.log(req);



            var html = '';

            html += "<html>";
            html += "<body>";


            for (i in pokeObj) {

                if (req === pokeObj[i].name.toLowerCase()) {

                    html += "<h1>"+ req.charAt(0).toUpperCase() + req.substr(1) +"</h1>";

                    var pokeWeight = pokeObj[i].weight;

                    response.status(200);

            html += '<div class=image"><img src=" '+ pokeObj[i].img + ' "></div>';

            html += '<div class="weight-txt">Weight: '+ pokeWeight + '</div>';

            html += '<div class="type">Pokemon Type: ';
            pokeObj[i].type.forEach(function(elem) {
                html += `<a href="/type/${elem.toLowerCase()}">${elem}</a>&nbsp`
            });
            html += '</div>';


            html += '<div class="weaknesses">Weaknesses: ';
            pokeObj[i].weaknesses.forEach(function(elem) {
                html += `<a href="/weakness/${elem.toLowerCase()}">${elem}</a>&nbsp`
                });
            html += '</div>';


            html += '<div class="next-evo"> Next Evolution(s): ';
            if(pokeObj[i].next_evolution !== undefined) {
                pokeObj[i].next_evolution.forEach(function(elem) {
                    html += `<a href="/${elem.name.toLowerCase()}">${elem.name}</a>&nbsp`;
                });
                } else {
                    html += `None`;
                };
            html +='</div>';


            html += '<div class="prev-evo"> Previous Evolution(s): ';
            if(pokeObj[i].prev_evolution !== undefined) {
                pokeObj[i].prev_evolution.forEach(function(elem) {
                    html += `<a href="/${elem.name.toLowerCase()}">${elem.name}</a>&nbsp`;
                });
                } else {
                    html += `None`;
                };
            html +='</div>';

            }
        };

        html += "</body>";
        html += "</html>";
        response.send(html);


        //No such pokemon:
        response.status(404);

        var html = '';
        html += '<html>'
        html += '<body>'
        html += "<h1>Woops!</h1>";
        html += `<p class="error-msg">Could not find information about ${request.path.substr(1)} - Is that a new pokemon? Gotta catch em' all! </p>`;
        html += "</body>";
        html += "</html>";
        response.send(html);
        return response.redirect('/');


      // send response with some data (a string)
      // response.send(request.path);
      console.log(request.path);

  });

});



app.get('/type/:typename', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;



            var type = request.params.typename.toLowerCase();
            var title = type.charAt(0).toUpperCase() + type.substr(1);
            var html = "";

            html += "<html>";
            html += "<body>";
            html += "<h1>"+title+"</h1>";
            html += "<ul>";

            for (i in pokeObj) {
                for (j in pokeObj[i].type) {
                    if (type === pokeObj[i].type[j].toLowerCase()) {

                    response.status(200);

                    html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                    html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                    html += '<br />';
                    }
                }
            };

            html += "</ul>"
            html += "</body>";
            html += "</html>";

            response.send(html);

    });
});

app.get('/weakness/:weaknessname', (request, response) => {

    jsonfile.readFile (file, function(err, obj) {

        console.log(file);

        pokeObj = obj.pokemon;

            var weaknessName = request.params.weaknessname.toLowerCase();
            var title = weaknessName.charAt(0).toUpperCase() + weaknessName.substr(1);
            var html = '';

            html += "<html>";
            html += "<body>";
            html += "<h1>"+title+"</h1>";

            for (i in pokeObj) {
                for (j in pokeObj[i].weaknesses) {
                    if (weaknessName === pokeObj[i].weaknesses[j].toLowerCase()) {

                    response.status(200);

                    html += '<li><img src="'+ pokeObj[i].img +'"></div>';
                    html += '<a href="/' + pokeObj[i].name.toLowerCase() + ' ">' + pokeObj[i].name + '</a></li>';
                    html += '<br />';
                    }
                }
            };

            // html += "</ul>"
            html += "</body>";
            html += "</html>";

            response.send(html);
    });
});


/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));