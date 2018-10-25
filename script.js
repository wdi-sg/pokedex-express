
window.onload = function(){
    document.querySelector('#hello')
        .addEventListener('click',doStuff);

};


function doStuff(){

    var ajaxUrl = "http://localhost:3000/foobar";

    // what to do when we recieve the request
    var responseHandler = function() {
      console.log("response text", this.responseText);
      console.log("status text", this.statusText);
      console.log("status code", this.status);

      var responseObj = JSON.parse(this.responseText);

      var h1 = document.createElement('h1');
      h1.innerText = responseObj.name;
      document.querySelector('body').appendChild( h1 );
    };

    // make a new request
    var request = new XMLHttpRequest();

    // listen for the request response
    request.addEventListener("load", responseHandler);

    // ready the system by calling open, and specifying the url
    request.open("GET", ajaxUrl);

    // send the request
    request.send();

};