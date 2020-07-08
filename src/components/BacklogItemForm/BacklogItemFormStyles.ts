import { makeStyles } from "@material-ui/core";
import { Colors } from "../../util/constants";

export const TaskCreationFormStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    drawer: {
        position: "relative"
    },
    textField: {
        marginTop: "10px",
        marginBottom: "10px",
    },
    paperFullWidth: {
        overflowY: 'visible'
    },
    dialogContentRoot: {
        overflowY: 'visible'
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
    memberContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignContent: "space-between",
        width: "100%",
    },
    iconButton: {
        height: "48px",
        top: "15px"
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
    createProjectBtn: {
        right: 10,
        position: "absolute",
    },
}));

export default TaskCreationFormStyles