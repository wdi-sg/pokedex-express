const React = require('react');

class Type extends React.Component {
	render() {
		const type = this.props.type;
		const pokemon_lst = this.props.pokemon_lst;
		const filtered_lst = pokemon_lst.filter(pokemon => pokemon.type.includes(type));
		const pokemon_li = filtered_lst.map(pokemon => {
			const link = '/pokemon/'+pokemon.name.toLowerCase();			
			return <li><a href={link}>{pokemon.name}</a></li>
		});

		return (
			<div>
				<p>
				These pokemons are of {type} type.
					<ul>
						{pokemon_li}
					</ul>
				</p>
			</div>
		);
	}
}


module.exports = Type;