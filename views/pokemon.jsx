import React, {Component} from 'react';

export default class Pokemon extends Component {
    render(){
        let { name, weight, type, weaknesses } = this.props;
        return(
            <html>
                <body>
                    <p>This is {name}, it weighs {weight}! {name} is a {type.join(", ")} and weak to {weaknesses.join(", ")}. </p>
                </body>
            </html>
        )
    }
}