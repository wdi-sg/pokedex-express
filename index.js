const express = require( 'express' );
const jsonfile = require( 'jsonfile' );
const file = './pokedex.json';
const app = express();
let dataHeader = "<html><body>";
let dataFooter = "</body></html>";
/**
 * ===================================
 * Configurations and set up
 * ===================================
 */

let capitalizeName = function( value ) {
    return value.charAt( 0 ).toUpperCase() + value.slice( 1 );
}

// Init express app

/**
 * ===================================
 * Routes
 * ===================================
 */

app.get( '/pokemon/name/:name', ( request, response ) => {
    let key = Object.keys( request.params )[ 0 ];
    let value = capitalizeName( Object.values( request.params )[ 0 ] );
    let preData = `<h1>Pokemon: ${value}</h1>`;
    let data = "";
    jsonfile.readFile( file, ( err, obj ) => {
        for ( let i = 0; i < obj[ "pokemon" ].length; i++ ) {
            console.log( `${i} ::: ${obj[ "pokemon" ][i][key]}` );
            if ( obj[ "pokemon" ][ i ][ key ] === value ) {
                let temp = obj[ "pokemon" ][ i ];
                data = `<p>This is ${temp.name}, he is ${temp.weight}!</p><img src="${temp.img}">`;

                break;
            } else {
                data = `Could not find information about ${value}  - Is that a new pokemon? Gotta catch em' all!`;
            }
        }
        response.send( dataHeader + preData + data + dataFooter );
    } );
} );

app.get( '/pokemon/type/:type', ( request, response ) => {
    let key = Object.keys( request.params )[ 0 ];
    let value = capitalizeName( Object.values( request.params )[ 0 ] );
    let preData = `<h1>List of Pokemon of Type: ${value}</h1><ul>`;
    let data = "";
    jsonfile.readFile( file, ( err, obj ) => {
        for ( let i = 0; i < obj[ "pokemon" ].length; i++ ) {
            if ( obj[ "pokemon" ][ i ][ key ].includes( value ) ) {
                //console.log( obj[ "pokemon" ][ i ][ "name" ] );
                data += `<li>${( obj[ "pokemon" ][ i ][ "name" ] )}</li>`;
            }
        }
        data += `</ul>`;
        response.send( dataHeader + preData + data + dataFooter );
    } );
} );

app.get( '/pokemon/weaknesses/:weaknesses', ( request, response ) => {
    let key = Object.keys( request.params )[ 0 ];
    let value = capitalizeName( Object.values( request.params )[ 0 ] );
    let preData = `<h1>List of Pokemon of Weaknesses: ${value}</h1><ul>`;
    let data = [];
    jsonfile.readFile( file, ( err, obj ) => {
        for ( let i = 0; i < obj[ "pokemon" ].length; i++ ) {
            if ( obj[ "pokemon" ][ i ][ key ].includes( value ) ) {
                //console.log( obj[ "pokemon" ][ i ][ "name" ] );
                data += `<li>${( obj[ "pokemon" ][ i ][ "name" ] )}</li>`;
            }
        }
        data += `</ul>`;
        response.send( dataHeader + preData + data + dataFooter );
    } );
} );

app.get( '/pokemon/prev_evolution/:prev_evolution', ( request, response ) => {
    let key = Object.keys( request.params )[ 0 ];
    let value = capitalizeName( Object.values( request.params )[ 0 ] );
    let preData = `<h1>List of Pokemon that evolves from : ${value}</h1><ul>`;
    let data = [];
    jsonfile.readFile( file, ( err, obj ) => {
        console.log(obj[ "pokemon" ][ 2 ][ key ][0]["name"]);
        for ( let i = 0; i < obj[ "pokemon" ].length; i++ ) {
            if ( key in obj[ "pokemon" ][ i ] ) {
                let tempObj = obj[ "pokemon" ][ i ][key];
                tempObj.forEach( (objT, index) => {
                    if ( tempObj[ index ]["name"].includes( value ) ) {
                        data += `<li>${( obj[ "pokemon" ][ i ][ "name" ] )}</li>`;
                    }
                } );
            }
        }
        data += `</ul>`;
        response.send( dataHeader + preData + data + dataFooter );
    } );
} );


app.get( '/', ( request, response ) => {
    // send response with some data (a string)
    let dataString = "<html><body><h1>Welcome to the Online Pokedex!</h1></body></html>";
    response.status( 404 );
    response.send( dataString );
} );

/**
 * ===================================
 * Listen to requests on port 3000
 * ===================================
 */

app.listen( 3000, () => console.log( '~~~ Tuning in to the waves of port 3000 ~~~' ) );
