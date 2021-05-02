const React = require('react');

class ChooseSort extends React.Component {
	render() {
		return (
			<html>
				<body>
					<form action="/sorted" method="get">
						<label>Choose a sorting:<br/>
							<select name="option">
								<option value="id">Id</option>
								<option value="name">Name</option>
								<option value="height">Height</option>
								<option value="weight">Weight</option>
							</select>
						</label>
						<input type="submit" value="submit"></input>
					</form>
				</body>
			</html>
			);
	}
}

module.exports = ChooseSort;