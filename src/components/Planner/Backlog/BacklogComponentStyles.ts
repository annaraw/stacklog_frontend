import { makeStyles } from "@material-ui/core";

export const backlogComponentStyles = makeStyles((theme) => ({
    backlogContainer: {
        width: "80%",
        height: "auto",
        margin: "20px auto",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
    },
    containerTitle: {
        float: "right",
        fontSize: "25px",
        marginRight: "20px",
        fontWeight: "bold",
    },
    containerControls: {
        float: "left",
    }
}));