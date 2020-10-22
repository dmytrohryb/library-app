import {createMuiTheme} from "@material-ui/core/styles";
import {blue, green, orange} from "@material-ui/core/colors";

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: orange[500],
        },
        success: {
            main: green[500]
        },
        type: "light"
    },
});
