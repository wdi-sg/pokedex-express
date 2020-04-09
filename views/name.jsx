const React = require('react');

class Name extends React.Component {
	render() {
		const name = this.props.name;
		const pokemon_lst = this.props.pokemon_lst;
		const searched_pokemon = pokemon_lst.find(pokemon => pokemon.name.toLowerCase() === name);
		let type_li;

		if (searched_pokemon.type && searched_pokemon.weaknesses){
			type_li = searched_pokemon.type.map(type => {
				const link = '/type/'+type;
				return <li><a href={link}>{type}</a></li>
			})
		} else {
			type_li = 'Unknown';
			searched_pokemon.weaknesses = 'Unknown';
		}

		if (searched_pokemon){
			return (
				<div>
					<p>
						This is {searched_pokemon.name}.<br/>
						<img src={searched_pokemon.img}/><br/>
						These are its stats:<br/>
						Type: {type_li}<br/>
						Height: {searched_pokemon.height}<br/>
						Weight: {searched_pokemon.weight}<br/>
						Weaknesses: {searched_pokemon.weaknesses.toString()}<br/>
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


module.exports = Name;