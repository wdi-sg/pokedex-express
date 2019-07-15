const express = require( 'express' );
const jsonfile = require( 'jsonfile' );
const file = './pokedex.json';
const app = express();

/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

let capitalizeName = function( value ) {
    return value.charAt( 0 ).toUpperCase() + value.slice( 1 ).toLowerCase();
}

// Init express app

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get( '/pokemon/name/:name', ( request, response ) => {
    let key = "name";
    let value = capitalizeName( request.params[ key ] );
    let preData = `<h1>Pokemon: ${value}</h1>`;
    let data = "";
    jsonfile.readFile( file, ( err, obj ) => {
        for ( let i = 0; i < obj[ "pokemon" ].length; i++ ) {
            if ( obj[ "pokemon" ][ i ][ key ] === value ) {
                let temp = obj[ "pokemon" ][ i ];
                data = `This is ${temp.name}, he is ${temp.weight}!`;
                break;
            } else {
                data = `Could not find information about ${value}  - Is that a new pokemon? Gotta catch em' all!`;
            }
        }
        response.send( data );
    } );
} );

app.get( '/pokemon/prev_evolution/:prev_evolution', ( request, response ) => {
    let key = "prev_evolution";
    let value = capitalizeName( request.params[ key ] );
    let preData = `<h1>List of Pokemon that evolves from : ${value}</h1>`;
    let data = [];
    jsonfile.readFile( file, ( err, obj ) => {
        obj[ "pokemon" ].forEach( ( pokemonObj ) => {
            if ( key in pokemonObj ) {
                pokemonObj[ key ].forEach( ( evoArr, index ) => {
                    if ( pokemonObj[ key ][ index ][ "name" ].includes( value ) ) data += `<p>${( pokemonObj[ "name" ] )}</p>`;
                } );
            }
        } );
        response.send( preData + data );
    } );
} );

app.get( '/pokemon/:properties/:value', ( request, response ) => {
    let key = request.params.properties.toLowerCase();
    let value = capitalizeName( request.params.value );
    let preData = `<h1>List of Pokemon of ${key}: ${value}</h1>`;
    let data = "";
    jsonfile.readFile( file, ( err, obj ) => {
        obj[ "pokemon" ].forEach( ( pokemonObj, index ) => {
            if ( pokemonObj[ key ].includes( value ) ) data += `<p>${( obj[ "pokemon" ][ index ][ "name" ] )}</p>`;
        } );
        response.send( preData + data );
    } );
} );

app.get( '/', ( request, response ) => {
    // send response with some data (a string)
    let dataString = "Welcome to the Online Pokedex!";
    response.status( 404 ).send( dataString );
} );

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen( 3000, () => console.log( '~~~ Tuning in to the waves of port 3000 ~~~' ) );
