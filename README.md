# Pokedex Express App

We will build our first web app using Node.js and Express - a Pokedex app.

For this exercise, we will be setting up express to intercept incoming requests on certain routes, reading data from a JSON file, and sending HTTP responses with data payloads like JSON or HTML.

## Getting Started

1.  Fork and clone this repository to your computer
2.  Run `yarn install` to install dependencies
3.  Look in the starter file called `index.js`. This will be the entry-point to your app
4.  Run `node index.js` to start a local server on port 3000
5.  Open `localhost:3000` on your browser and see the home page

Additionally, to improve your workflow, install the `nodemon` package. Nodemon helps us restart our local server every time it detects a "save" event on `index.js`. Neat stuff.

```
# install nodemon in Terminal
yarn global add nodemon

# run nodemon to start server
nodemon index.js
```

#### Note on comments:

The comments in this file are deliberately verbose meant to orientate you to an Express app for the first time. Feel free to remove any or all comments.

## Deliverables

Use the data in `pokedex.json` and return a response with details about the requested Pokemon. Specifically:

* Go through `pokedex.json` to understand how the data is structured. Where are all the pokemon data stored?
* Return a string response with the requested pokemon's image url (eg. `localhost:3000/names/Bulbasaur` should show Bulbasaur's image url)
* TBC ...
