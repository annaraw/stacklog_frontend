import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const backlogComponentStyles = makeStyles((theme) => ({
    backlogContainer: {
        height: "auto",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
        flexDirection: "column",
        display: "flex",
        position: "relative"
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
        zIndex: 10,
        position: "absolute",
        bottom: "0",
        right: "0",
        backgroundColor: Colors.primaryColor,
        WebkitBoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        MozBoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        BoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        color: "white",
        margin: "40px",
        '&:hover': {
            backgroundColor: Colors.primaryColor,
            filter: "brightness(85%)",
        }
    },
}));