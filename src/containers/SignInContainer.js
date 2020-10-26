import {changeUser} from "../store/PersonalBlock/actions";
import {connect} from "react-redux";
import React from 'react'
import {SignIn} from "../components/SignIn/SignIn";

class SignInContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return <SignIn user={this.props.user} changeUser={this.props.changeUser} showAlert={this.props.showAlert}/>
    }
}

const mapStateToProps = state => {
    return {
        user: state.personalBlock.user
    }
}

const mapDispatchToProps = {
    changeUser
}

export default connect(mapStateToProps, mapDispatchToProps)(SignInContainer)
