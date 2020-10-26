import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavigationMenu} from "./NavigationMenu";
import PersonalBlockContainer from "../../containers/PersonalBlockContainer";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export function Header(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <NavigationMenu />
                    </Typography>
                    <PersonalBlockContainer showAlert={props.showAlert} />
                </Toolbar>
            </AppBar>
        </div>
    );
}
