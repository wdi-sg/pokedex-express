const React = require('react');

class Weakness extends React.Component {
	render() {
		const weakness = this.props.weakness;
		const pokemon_lst = this.props.pokemon_lst;
		const filtered_lst = pokemon_lst.filter(pokemon => pokemon.weaknesses.includes(weakness));
		const pokemon_li = filtered_lst.map(pokemon => {
			return <li>{pokemon.name}</li>
		});
		// if (condition){
		return (
			<div>
				<p>
				These pokemons are weak to {weakness}.
					<ul>
						{pokemon_li}
					</ul>
				</p>
			</div>
		// 	);
		// } else {
		// 	return (
		// 		<div>
		// 			<p>



		// 			</p>
		// 		</div>
		);
	}
}


module.exports = Weakness;