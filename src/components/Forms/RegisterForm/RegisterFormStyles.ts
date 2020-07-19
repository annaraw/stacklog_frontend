import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const registerStyles = makeStyles({
    root: {
        width: 400,
        padding: "20px",
        margin: "20vh auto",
        height: "max-content"
    },
    textField: {
        marginBottom: "15px",
    },
    button: {
        width: "100%",
        backgroundColor: Colors.primaryColor
    },
    stepper: {
        maxWidth: 400,
        flexGrow: 1,
        backgroundColor: "white",
    }
});