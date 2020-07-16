import { makeStyles } from "@material-ui/core";

export const unsortedBacklogStyles = makeStyles((theme) => ({
    drawer: {
        position: "relative"
    },
    backlogContainer: {
        width: "90%",
        height: "calc(100vh - 200px)",
        margin: "20px auto",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column"
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
        height: "95%"
    },
}));