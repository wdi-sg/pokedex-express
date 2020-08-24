const express = require('express');
const app = express();

const jsonfile = require('jsonfile');
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);
app.set('view engine', 'jsx');
app.set('views', __dirname + "/views");


app.get('/pokedex/:somename', (req, res) => {
  jsonfile.readFile('./pokedex.json', (err, obj) => {
  for(i=0; i<obj.pokemon.length; i++){
        if(obj.pokemon[i].name.toLowerCase() === req.params.somename){
            const data = {
        name: obj.pokemon[i].name,
        weight:obj.pokemon[i].weight
    }
                res.render('pokemon', data);
        }
    }


})
})




app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));