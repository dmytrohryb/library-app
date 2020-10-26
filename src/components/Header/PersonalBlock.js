import React from "react";
import Button from "@material-ui/core/Button";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import {ProfileMenu} from "./ProfileMenu";
import {Link} from "react-router-dom";

export class PersonalBlock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        }
    }

    guestMode(){
        return <>
        <Link to="/sign-in"><Button variant="contained" color="primary">Sign In</Button></Link>
            <div style={{marginInline: 5}} />
        <Link to="/sign-up"><Button variant="contained" color="secondary">Sign Up</Button></Link>
        </>
    }

    userMode(){
        return<>
            <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                    <ShoppingCartIcon />
                </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                    <NotificationsIcon />
                </Badge>
            </IconButton>
            <ProfileMenu showAlert={this.props.showAlert} changeUser={this.props.changeUser} />
            </>
    }

    render() {
        return (!this.props.user) ? this.guestMode() : this.userMode()
    }
}
