import { makeStyles } from "@material-ui/core";
import { Colors } from "../../util/constants";

export const addCalendarFormStyles = makeStyles({
    root: {
        maxWidth: 400,
        padding: "20px",
        margin: "20vh auto",
    },
    drawer: {
        position: "relative"
    },
    text: {
        margin: "5px"
    },
    box: {
        padding: "20px",
        width:"800px"
    },
    closeButton: {
        position: "absolute",
        top: "20px",
        right: "10px"
    },
    drawerHeading: {

    },
    textField: {
        marginBottom: "5px"
    },
    drawerFooter: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: "20px"
    },
    borderBox: {
        margin: "10px",
        border: "1px solid #C0C0C0",
        padding: "10px",
        borderRadius: "5px"
    },
    button: {
        fontWeight: "bold",
        width:"100%",
        marginBottom:"5px"
    },
    primaryButton: {
        margin: "5px",
        backgroundColor: Colors.primaryColor
    },
    secondaryButton: {
        margin: "5px",
        backgroundColor: Colors.secondaryColor
    }
});