/**
 * ===================================
 * Configurations and set up
 * ===================================
 */
const express = require('express');
//tell script to require express and name it express
const app = express();
//tell script to use the express(); function whenever app is called
const jsonfile = require('jsonfile');
//same idea

const reactEngine = require('express-react-views').createEngine();
//just like using canvas to enable React commands
app.engine('jsx', reactEngine);
//to tell script that jsx will be used alongside the engine

app.set('views', __dirname + '/views');
// this tells express where to look for the view files

app.set('view engine', 'jsx');
// this line sets react to be the default view engine

const methodOverride = require('method-override')
app.use(methodOverride('_method'));
//required as a workaround since all requests will be 'put'
//which means that the put request will be masked with override as a put, but in fact is whatever is defined in this script, ie. a POST

app.use(express.json());
//tells express to enable json usage

app.use(express.urlencoded({
  extended: true
}));
//allows urls to extend ie. /pokemon/1/2/3/4

/**
 * ===================================
 * Routes
 * ===================================
 */
//you need something to submit request before it can run
app.get("/pokemon",(req,res)=>{
//use function to CREATE a new route (localhost:3000/pokemon)

res.render('home')
//render connects to home.jsx's render() & home refers to home.jsx
});

app.get("/pokemons/:id/",(req,res)=>{
//create another route (/pokemons/:id/)

console.log(req.params);
//will return req.params's value (in this case, we want an id so it'll likely be a number ie. localhost:3000/pokemons/1)

//but 1 isn't enough

let pokeID = parseInt(req.params.id-1);
//we will be reading an array which starts with 0, since pokemon's index starts with 1, we need the user input to be -1 so that array[0] aka pokemon#1 will register
//parseInt is important so that string will turn into number
//we need to define req.params before we can use it

//but now all this does is bring us to page /pokemon/1
//we need to show the user visual information
//but first we need to define visual information
//so we retrieve the data needed:

//all the info we need will be inside this json
jsonfile.readFile('./pokedex.json', (err, contentsOfFile) => {
//first, since it's the json file that the pokemon are in, we read it with command jsonfile.readFile
//to specify which file we add ('location of file',
//to specify parameters we add (error, what to do with file))

        // console.log(contentsOfFile.pokemon[32]);
        // res.send(contentsOfFile.pokemon[pokeID]);

let pokeInfo = contentsOfFile.pokemon[pokeID];
//we can use pokeID not only to write the URL, but also to read the array since it matches the json file's index!
//therefore inside contentsOfFile, we type a '.' which acts like a 'cd' in command line to read deeper into the array
//.pokemon is the name of the array
//.pokemon[pokeID] is the index value within the array
//we define/name all this crap as pokeInfo

    res.render('pokemon', {pokeInfo:pokeInfo})
//now that we got our juicy info, time to RENDER it to browser via response.render
//we can type 'pokemon' as pokemon.jsx is inside the views folder and is uniquely recognised
//{pokeInfo:pokeInfo} kinda syntaxy since {}objects need {key:value} ie:
//{
//x : angelmon
//}
    });
}
)

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */
app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));