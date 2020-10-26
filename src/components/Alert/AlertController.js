import React from "react";
import {Alert} from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";

export function AlertController (props){

    const [open, setOpen] = React.useState(props.open)
    const [type, setType] = React.useState(props.type)


    return <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <Alert onClose={() => setOpen(false)} severity={type}>
            This is a success message!
        </Alert>
    </Snackbar>
}
