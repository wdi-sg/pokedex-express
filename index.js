const express = require('express');
const jsonfile = require('jsonfile');
const file = 'pokedex.json'
const app = express();

const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

app.set('views', __dirname + '/views');

app.set('view engine', 'jsx');

app.get('/', (request, response) => {
    jsonfile.readFile(file, (err, obj) =>{
        response.render('home', obj)
    })
});

app.get('/pokemon/:name',(request, response) => {
    let name = request.params.name;
    jsonfile.readFile(file, (err, obj) =>{
         let index = obj.pokemon.findIndex((item)=>{
            if(item.name === name){
                return true;
            }
         })
         if(index > 0){
             let data = obj.pokemon[index];
             response.render('pokemon', data)
         } else {
            response.redirect(404, '/')
         }
    })
})

app.get('/type/:type',(request, response) => {
    let type = request.params.type;
    jsonfile.readFile(file, (err, obj) =>{
        let typeArr = obj.pokemon.filter((item)=>{
            return item.type.includes(type);
        })

        console.log(typeArr);
        let data = {
            'type' : type,
            'array' : typeArr
        }
        response.render('type', data)
    })
})

app.get('/weaknesses/:weaknesses',(request, response) => {
    let weaknesses = request.params.weaknesses;
    jsonfile.readFile(file, (err, obj) =>{
        let weaknessesArr = obj.pokemon.filter((item)=>{
            return item.weaknesses.includes(weaknesses);
        })
        let data = {
            'weaknesses' : weaknesses,
            'array' : weaknessesArr
        }
        response.render('weaknesses', data)
    })
})

app.get('/search/spawn_chance', (request, response) =>{
    let amount = request.query.amount;
    let compare = request.query.compare;
    if (compare === 'less'){
        jsonfile.readFile(file, (err, obj) =>{
            let lessSpawn = obj.pokemon.filter((item)=>{
                return item.spawn_chance < amount;
            })
            let data = {
                'array' : lessSpawn
            }
            response.render('spawn-chance', data)
        })
    }
})
// [x]default landing page Welcome to ...
// [x]url is the name of the pokemon in the array shld return name of pokemon
// [x]show all details
// [x]url show selected types of pokemon
// [x]url show selected weakness of pokemon
// [skip]url show the pokemon that evolves from other pokemon
//
// [x] create a handler for each route
// [x] return html as a response
// [x] format html
// - [x] use ul for each attribute
// - [x] create links to link to every pokemons page
//
// [x] if pokemon does not exist redirect to root url
// [skip] add CSS ??
// [] create routes for spawn_chance and avg_spawns
// [] create routes for height weight and spawn_time




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));