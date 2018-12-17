var socket = io();

let search = document.getElementById('search');

search.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) { 
        socket.emit('search query',`${search.value}`)
        search.value='';
    }
});

socket.on('search result', function(obj){displayPokemonInfo(obj)});

const displayPokemonInfo = (obj) =>{
    let pokeName = document.querySelector('.pokemon-name');
    pokeName.innerHTML = `${obj.name}`;
    let pokeImg = document.querySelector('.pokemon-img');
    pokeImg.innerHTML=`<img src="${obj.img}">`
};