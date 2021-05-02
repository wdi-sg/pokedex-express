const React = require('react');

class NextEvolution extends React.Component {
	render() {
		const name = this.props.name;
		const pokemon_lst = this.props.pokemon_lst;
		const searched_pokemon = pokemon_lst.find(pokemon => pokemon.name.toLowerCase() === name);

		if (searched_pokemon && searched_pokemon.next_evolution){
			const next_evolution_li = searched_pokemon.next_evolution.map(evolution => {
				return <li>{evolution.name}</li>;
			})		
			return (
				<div>
					<p>
						This is {searched_pokemon.name}.<br/>
						<img src={searched_pokemon.img}/><br/>
						These are its stats:<br/>
						It evolves into:<br/>
						{next_evolution_li}
					</p>
				</div>
			);
		} else if (searched_pokemon) {
			return (
				<div>
					<p>
						{searched_pokemon.name} does not have a next evolution.
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


module.exports = NextEvolution;