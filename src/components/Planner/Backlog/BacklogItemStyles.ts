import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const backlogItemStyles = makeStyles((theme) => ({
    root: {
        borderStyle: "solid",
        margin: "5px",
        borderRadius: "5px",
        borderWidth: "thin",
        position: "relative",
        borderColor: Colors.secondaryColor,
        '&:hover': {
            borderColor: "black",
        }
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
    description: {
        marginBottom: "5px",
        fontSize: "12px",
        fontWeight: "normal",
        height: "18px",
    },
    cardContent: {
        padding: "10px",
        paddingTop: "0px",
        paddingLeft: "20px",
        '&:last-child': {
            padding: "10px",
            paddingTop: "0px",
        }
    },
    cardHeaderFont: {
        fontSize: "15px",
        fontWeight: "bold",
    },
    cardHeader: {
        margin: "0px",
        padding: "5px",
        paddingLeft: "10px"
    },
    chip: {
        marginRight: "5px",
        marginBottom: "5px"
    },
    chipBox: {
        float: "left"
    },
    buttonBox: {
        float: "right"
    },
    button: {
        fontSize: "24px",
        padding: "5px",
        marginBottom: "5px",
        backgroundColor:"#e0e0e0",
        marginLeft: "5px"
    },
    ellipsis: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "0",
        margin: "0",
        maxWidth: "350px"
    }
}));

