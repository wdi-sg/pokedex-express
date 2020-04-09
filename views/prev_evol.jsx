const React = require('react');

class PrevEvolution extends React.Component {
	render() {
		const name = this.props.name;
		const pokemon_lst = this.props.pokemon_lst;
		const searched_pokemon = pokemon_lst.find(pokemon => pokemon.name.toLowerCase() === name);

		if (searched_pokemon && searched_pokemon.prev_evolution){
			const prev_evolution_li = searched_pokemon.prev_evolution.map(evolution => {
				return <li>{evolution.name}</li>;
			})		
			return (
				<div>
					<p>
						This is {searched_pokemon.name}.<br/>
						<img src={searched_pokemon.img}/><br/>
						These are its stats:<br/>
						It evolves from:<br/>
						{prev_evolution_li}
					</p>
				</div>
			);
		} else if (searched_pokemon){
			return (
				<div>
					<p>
						{searched_pokemon.name} does not have a previous evolution.
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<p>
						Could not find information about {name}. Is that a new pokemon? Gotta catch em' all!
					</p>
				</div>
			);
		}
	}
}


module.exports = PrevEvolution;