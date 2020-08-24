const React = require('react')

class Pokemon extends React.Component {
    render() {
        let typeText = ""
        let weaknessText = ""

        if(this.props.type.length>1){
            typeText = "Its types are "
            for(var i=0;i<this.props.type.length;i++){
                if(i!==this.props.type.length-1){
                    let typeURL = "/type/" + this.props.type[i]
                    typeText += this.props.type[i]
                    typeText += ", "
                } else {
                    let typeURL = "/type/" + this.props.type[i]
                    typeText += "and "
                    typeText += this.props.type[i]
                }
            }
        } else {
            let typeURL = "/type/" + this.props.type[i]
            typeText = "Its type is "
            typeText = this.props.type[i]
        }

        if(this.props.weaknesses.length>1){
            weaknessText = "Its weaknesses are "
            for(var j=0;j<this.props.weaknesses.length;j++){
                if(j!==this.props.weaknesses.length-1){
                    weaknessText += this.props.weaknesses[j] + ", "
                } else {
                    weaknessText += "and " + this.props.weaknesses[j]
                }
            }
        } else {
            weaknessText = "Its weakness is " + this.props.weaknesses[0]
        }


        return (
            <html>
                <body>
                  <div>
                    <h1>{this.props.name}</h1>
                    <img src={this.props.img}/>
                    <p>This is {this.props.name}. It weighs {this.props.weight} and its height is {this.props.height}. {typeText}. {weaknessText}.</p>
                  </div>
                </body>
            </html>

            )
    }
}


module.exports = Pokemon;