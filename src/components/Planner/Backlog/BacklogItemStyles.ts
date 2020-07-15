import { makeStyles } from "@material-ui/core";

export const backlogItemStyles = makeStyles((theme) => ({
    backlogContainer: {
        width: "80%",
        height: "auto",
        margin: "20px auto",
        backgroundColor: "white",
        overflow: "hidden",
        padding: "20px",
    },
    backlogItem: {
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
        transition: "0.3s",
        margin: "10px",
        cursor: "pointer",
        '&:hover': {
            boxShadow: "0 8px 16px 0 rgba(0, 0, 0, 0.2)",
            backgroundColor: "-50%",
        }
    },
    header: {
        padding: "20px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "12px",
        fontWeight: "normal",
    },
}));

