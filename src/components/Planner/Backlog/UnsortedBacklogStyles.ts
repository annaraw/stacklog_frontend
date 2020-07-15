import { makeStyles } from "@material-ui/core";

export const unsortedBacklogStyles = makeStyles((theme) => ({
    drawer: {
        position: "relative"
    },
    backlogContainer: {
        width: "80%",
        height: "80vh",
        margin: "20px auto",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
        position: "relative",
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
        background: "black",
        color: "white",
        margin: "40px",
        '&:hover': {
            backgroundColor: "#333",
        }
    },
    scrollbar: {
        width: "100%",
        float: "left",
        height: "500px"
    }
}));