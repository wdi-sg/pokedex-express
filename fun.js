module.exports.pokemon = (obj, name) => {
  let pokeLen = obj.pokemon.length;
  let output = "";
  for (let i = 0; i < pokeLen; i++) {
    if (obj.pokemon[i].name.toLowerCase().includes(name)) {
      console.log(obj.pokemon[i]);
       output = `<h1>${obj.pokemon[i].name}</h1><br><img src="${obj.pokemon[i].img}"></img><p>Number: ${obj.pokemon[i].num}<br>Type: ${obj.pokemon[i].type}<br>Weight: ${obj.pokemon[i].weight}<br>Height: ${obj.pokemon[i].height}<br> Candy: ${obj.pokemon[i].candy}<br>Candy Count: ${obj.pokemon[i].candy_count}<br>Egg: ${obj.pokemon[i].egg}<br>Spawn Chance: ${obj.pokemon[i].spawn_chance}<br>Avg: ${obj.pokemon[i].avg_spawns}<br> Spawn Time: ${obj.pokemon[i].spawn_time}<br>Multipliers: ${obj.pokemon[i].multipliers}<br>Weakneses: ${obj.pokemon[i].weaknesses}<br>`;
      if (obj.pokemon[i].hasOwnProperty("prev_evolution")){
        let pEvoLen = obj.pokemon[i].prev_evolution.length;
        for (let j = 0; j < pEvoLen; j++) {
          output = output + `Previous Evolution: ${obj.pokemon[i].prev_evolution[j].name}<br>`;
        }
      }
      if (obj.pokemon[i].hasOwnProperty("next_evolution")){
        let nEvoLen = obj.pokemon[i].next_evolution.length;
        for (let j = 0; j < nEvoLen; j++) {
          output = output + `Next Evolution: ${obj.pokemon[i].next_evolution[j].name}<br>`;
        }
      }
    
    }
  }
  return output;
};

module.exports.type = (obj, type) => {
  let pokeLen = obj.pokemon.length;
  const pokeType = [];
  for (let i = 0; i < pokeLen; i++) {
    let typeLen = obj.pokemon[i].type.length;
    for (let j = 0; j < typeLen; j++) {
      if (obj.pokemon[i].type[j].toLowerCase().includes(type)) {
        pokeType.push(obj.pokemon[i].name);
      }
    } 
  }
  return pokeType.join("<br>");
};

module.exports.weaknesses = (obj, weakness) => {
  let pokeLen = obj.pokemon.length;
  const pokeWeak = [];
  for (let i = 0; i < pokeLen; i++) {
    let typeLen = obj.pokemon[i].type.length;
    for (let j = 0; j < typeLen; j++) {
      if (obj.pokemon[i].weaknesses[j].toLowerCase().includes(weakness)) {
        pokeWeak.push(obj.pokemon[i].name);
      }
    } 
  }
  return pokeWeak.join("<br>");
};

module.exports.nextevolution = (obj, evo) => {
  let pokeLen = obj.pokemon.length;
  const pokeEvo = [];
  for (let i = 0; i < pokeLen; i++) {
    if(obj.pokemon[i].name.toLowerCase().includes(evo)) {
      if (obj.pokemon[i].hasOwnProperty("prev_evolution")){
        let pEvoLen = obj.pokemon[i].prev_evolution.length;
        for (let j = 0; j < pEvoLen; j++) {
            pokeEvo.push(obj.pokemon[i].prev_evolution[j].name);
        }
      } else {
        pokeEvo.push("no previous evolution");
      }
      if (obj.pokemon[i].hasOwnProperty("next_evolution")){
        let nEvoLen = obj.pokemon[i].next_evolution.length;
        for (let j = 0; j < nEvoLen; j++) {
          pokeEvo.push(obj.pokemon[i].next_evolution[j].name);
        }
      } else {
        pokeEvo.push("no next evolution");
      }
    }
  }
  return pokeEvo.join("<br>");
}