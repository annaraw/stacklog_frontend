import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const unsortedBacklogStyles = makeStyles((theme) => ({
    drawer: {
        position: "relative"
    },
    backlogContainer: {
        height: "calc(100vh - 200px)",
        marginLeft: "20px",
        marginTop: "3.2%",
        marginBottom: "5%",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "thin",
        borderColor: Colors.secondaryColor,
        '&:hover': {
            borderColor: "black",
        }
    },
    containerTitle: {
        float: "right",
        fontSize: "25px",
        marginRight: "20px",
        fontWeight: "bold",
    },
    containerControls: {
        float: "left",
    },
    addButton: {
        zIndex:10,
        position: "absolute",
        bottom: "0",
        right: "0",
        background: Colors.primaryColor,
        color: "white",
        margin: "20px",
        '&:hover': {
            backgroundColor: Colors.primaryColor,
            filter: "brightness(85%)"
        }
    },
    scrollbar: {
        width: "100%",
        float: "left",
        height: "95%"
    },
}));