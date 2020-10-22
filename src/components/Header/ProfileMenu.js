import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from "@material-ui/icons/AccountCircle";
import IconButton from "@material-ui/core/IconButton";

export class ProfileMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }

        this.handleOpenMenu = this.handleOpenMenu.bind(this)
        this.handleCloseMenu = this.handleCloseMenu.bind(this)
    }

    handleOpenMenu (event) {
        this.setState({anchorEl: event.currentTarget});
    };

    handleCloseMenu () {
        this.setState({anchorEl: null});
    };

    render() {
        return (
            <>
                <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={'profile-menu'}
                    aria-haspopup="true"
                    onClick={this.handleOpenMenu}
                    color="inherit"
                >
                    <AccountCircle />

                </IconButton>
                <Menu
                    id="profile-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleCloseMenu}
                >
                    <MenuItem onClick={this.handleCloseMenu}>Profile</MenuItem>
                    <MenuItem onClick={this.handleCloseMenu}>My orders</MenuItem>
                    <MenuItem onClick={this.handleCloseMenu}>Settings</MenuItem>
                    <MenuItem onClick={this.handleCloseMenu}>Logout</MenuItem>
                </Menu>
            </>
        );
    }

}
