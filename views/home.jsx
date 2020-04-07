const React = require('react');

class Home extends React.Component {
	render() {
		return (
			<html>
				<body>
					<form action="/sort" method="post">
						<label>Choose a sorting:<br/>
							<select name="option">
								<option value="id">Id</option>
								<option value="num">Num</option>
								<option value="name">Img</option>
								<option value="height">Height</option>
								<option value="weight">Weight</option>
							</select>
						</label>
						<button>Press to sort</button>
					</form>
				</body>
			</html>
			);
	}
}

module.exports = Home;