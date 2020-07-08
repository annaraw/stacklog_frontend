import { makeStyles } from "@material-ui/core";
import { Colors } from "../../util/constants";

export const drawerFormStyles = makeStyles((theme) => ({
    drawer: {
        position: "relative"
    },
    textField: {
        marginTop: "10px",
        marginBottom: "10px",
    },
    box: {
        width: "500px",
        padding: "20px",
    },
    drawerHeading: {

    },
    closeButton: {
        position: "absolute",
        top: "20px",
        right: "10px"
    },
    drawerFooter: {
        position: "fixed",
        bottom: 0,
        left: 0,
    },
    buttonContainer: {
        position: "absolute",
        right: "15px",
        bottom: "10px",
    },
    primaryButton: {
        backgroundColor: Colors.primaryColor,
        margin: "5px",
    },
    defaultButton: {
        backgroundColor: Colors.secondaryColor,
        margin: "5px",
    },
}));