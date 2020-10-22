import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import React from "react";

export function Footer() {
    return (
        <Typography variant="body2" color="textSecondary">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Library app
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

