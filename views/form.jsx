const React = require('react');

class Form extends React.Component {
	render() {

		return (
			<html>
				<body>
					<form action="/pokemon" method="post">
						<label htmlFor="id">Id:</label>
						<input type="text" name="id"/><br/><br/>					
						<label htmlFor="id">Num:</label>
						<input type="text" name="num"/><br/><br/>						
						<label htmlFor="id">Name:</label>
						<input type="text" name="name"/><br/><br/>						
						<label htmlFor="id">Img:</label>
						<input type="text" name="img"/><br/><br/>						
						<label htmlFor="id">Height:</label>
						<input type="text" name="height"/><br/><br/>						
						<label htmlFor="id">Weight:</label>
						<input type="text" name="weight"/><br/><br/>
						<button type="submit">Add Pokemon</button>

						<h2>{this.props.error}</h2>
					</form>	
				</body>
			</html>
			);
	}
}

module.exports = Form;