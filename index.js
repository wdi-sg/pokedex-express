/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express') ;
const jsonfile = require('jsonfile');

const pokedex = 'pokedex.json';

const app = express();

/**
 * ===================================
 * Routes
 * ===================================
 */

 //Type
app.get('/type/:user', (request, response) => {

  var userRequest = request.params.user[0].toUpperCase() + request.params.user.substring(1).toLowerCase();
  
  jsonfile.readFile(pokedex, (err,obj) => {
    let list = '';
    var check;

    for(var i = 0 ; i<obj["pokemon"].length ; i++){
      if(obj["pokemon"][i].type.includes(userRequest)){
        list += `<li>${obj['pokemon'][i]['name']}</li>`
        check = true;
  
      }
    }
     
    var html = ""
    html += `<h1> Pokemon of type ${userRequest}</h1>`
    html += "<html>"
    html +=  `<h3>${list}</h3>`
    html += "</html>"

  if (check === true) {  
  response.send(html)
  } else {
    response.status(404)
    response.send('no have')
  }  
  }); 

});

//Weakness
app.get('/weakness/:nameWeakness',(request, response) => {

  var userRequest = request.params.nameWeakness[0].toUpperCase() + request.params.nameWeakness.substring(1).toLowerCase();
  jsonfile.readFile(pokedex, (err,obj) => {

    let list = ''

    for(var i = 0 ; i<obj["pokemon"].length ; i++ ){
      if(obj['pokemon'][i].weaknesses.includes(userRequest)){
        list += `<li>${obj['pokemon'][i]['name']}</li>`
      }
    }
    var html = ""
    html += "<html>"
    html += `<h1> Pokemon that is weak against ${userRequest}</h1>`
    html += `<h3>${list}</h3>`
    html += "</html>"

    response.send(html)
  })
})

//next_evolution
app.get('/nextevolution/:nameEvolution',(request, response) =>{

  var userRequest = request.params.nameEvolution[0].toUpperCase() + request.params.nameEvolution.substring(1).toLowerCase();
  jsonfile.readFile(pokedex, (err,obj) =>{

    let list = ''
    let image = ''


    for(var i = 0 ; i<obj['pokemon'].length ; i++){
      if (obj['pokemon'][i]['name'] === userRequest) {
      for(var j = 0 ; j<obj['pokemon'][i]['next_evolution'].length ; j++){
      list += `<li>${obj['pokemon'][i]["next_evolution"][j]['name']}</li>`
      image = `<img src="${obj['pokemon'][i]['img']}">`
      }
      }
    }
    var html = ""
    html += "<html>"
    html += `<h1> Next Evolution for : ${userRequest}</h1>`
    html += `${image}`
    html += `<h3>${list}</h3>`
    html += "</html>"

    response.send(html)
  })
})

//Pokemon
// app.get('/:pokeName',(request,response) => {

//   var userRequest = request.params.pokeName[0].toUpperCase() + request.params.pokeName.substring(1).toLowerCase();
//   jsonfile.readFile(pokedex,(err,obj) => {

//     let info = ''

//   for(var i = 0 ; i<obj['pokemon'].length ; i++){
//     if(obj['pokemon'][i]['name'] === userRequest){
//       info += ``

//     }
//   }

  
//   })

// })

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));
