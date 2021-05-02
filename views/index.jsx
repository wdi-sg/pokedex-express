const React = require('react');

class Index extends React.Component {
	render() {
		const pokemon_lst = this.props.pokemon_lst;
		const pokemon_lst_li = pokemon_lst.map(pokemon => {
			const link = '/pokemon/'+pokemon.name.toLowerCase();
			return <li><a href={link}>{pokemon.name}</a></li>
		})

		return (
			<html lang="en">
			<head>
				<meta charSet="UTF-8"/>
				<title>Document</title>
			</head>
			<body>
				<div>
					<a href='/pokemon/new'>Create new pokemon</a>
					<p>All Pokemons:
						<ul>
							{pokemon_lst_li}
						</ul>
					</p>
				</div>
			</body>
			</html>
		);
	}
}


module.exports = Index; 