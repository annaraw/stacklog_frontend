import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const personalDataStyles = makeStyles({
    root: {
        maxWidth: 400,
        padding: "20px",
        width: "40%",
        margin: "20vh auto",
    },
    textField: {
        marginBottom: "15px",
    },
    button: {
        width: "100%",
        backgroundColor: Colors.primaryColor
    },
});