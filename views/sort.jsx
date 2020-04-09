const React = require('react');

class Sort extends React.Component {
	render() {
		const query = this.props.query;
		const pokemon_lst = this.props.pokemon_lst;
		const sorted_pokemons = pokemon_lst.sort((a, b) => {
				return a[query] < b[query] ? -1 : a[query] > b[query] ? 1 : 0;
		})
		const sorted_pokemons_li = sorted_pokemons.map(pokemon => {
			const link = '/pokemon/'+pokemon.name.toLowerCase();
			return <li><a href={link}>{pokemon.name}</a></li>
		})

		return (
				<div>
					<p>Sorted Pokemons by {query}:
						<ul>
							{sorted_pokemons_li}
						</ul>
					</p>
				</div>
		);
	}
}


module.exports = Sort; 