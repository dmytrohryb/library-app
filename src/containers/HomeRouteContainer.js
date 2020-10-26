import React from "react";
import {Home} from "../routes/Home";
import {connect} from 'react-redux'
import {changeUser} from "../store/PersonalBlock/actions";
import Cookies from 'js-cookie'
import Axios from 'axios'
import openSocket from 'socket.io-client';

class HomeRouteContainer extends React.Component {
    constructor(props) {
        super(props);
        if(Cookies.get('token')){
            Axios.post('http://localhost:4000/identification', {
                token: Cookies.get('token')
            })
                .then(res => {
                    openSocket('http://localhost:8000', {query: {
                            token: Cookies.get('token')
                        }})
                    if(res) this.props.changeUser(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    render() {
        return <Home user={this.props.user} changeUser={this.props.changeUser} />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeRouteContainer)
