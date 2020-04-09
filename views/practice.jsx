var React = require('react');

class Home extends React.Component {
  render() {
    const tax = this.props.items[10].product.inventories[0].availability
    const inventory = this.props.items[10].product.inventories[0]

    if (inventory.tax === undefined){
          return (
      <div>
        <p>No Tax :(</p>
      </div>

      )

    } else {
        return (
          <div>
           <p>Tax: {tax}</p>
          </div>
    );
  };
  }
}

module.exports = Home;