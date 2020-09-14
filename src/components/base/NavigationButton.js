import React from "react";
import '../../styles/NavigationButton.css'

export class NavigationButton extends React.Component{
    constructor(props) {
        super(props);
        this.onPress = this.onPress.bind(this)
    }

    onPress(){
        this.props.onPress()
    }

    render() {
        return(
            <button type='button' onClick={this.onPress} className="nav-btn">{this.props.name}</button>
        )
    }
}