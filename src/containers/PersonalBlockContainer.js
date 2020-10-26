import React from "react";
import {PersonalBlock} from "../components/Header/PersonalBlock";
import {connect} from 'react-redux'
import {changeUser} from "../store/PersonalBlock/actions";

class PersonalBlockContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <PersonalBlock showAlert={this.props.showAlert} user={this.props.user} changeUser={this.props.changeUser} />
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalBlockContainer)
