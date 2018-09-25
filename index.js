const express = require('express');

// const jsonfile = require('jsonfile');

// Init express app
const app = express();



app.get('*', (request, response) => {
    // send response with some data (a string)
    response.send(request.path);
});


app.listen(3000, () => console.log('~~~ Tuning in to the waves of port 3000 ~~~'));