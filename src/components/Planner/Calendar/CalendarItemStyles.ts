import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const calendarItemStyles = makeStyles((theme) => ({
    root: {
        borderStyle: "solid",
        margin: "2px",
        borderRadius: "5px",
        borderWidth: "thin",
        position: "relative",
        borderColor: Colors.secondaryColor,
        //height: "135px",
        height: "30px",
        '&:hover': {
            borderColor: "black",
        }
    },
    description: {
        marginBottom: "5px",
        fontSize: "12px",
        fontWeight: "normal",
        height: "18px",
    },
    cardContent: {
        padding: "5px",
        paddingTop: "0px",
        paddingLeft: "5px",
        '&:last-child': {
            padding: "5px",
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
        paddingLeft: "10px",
        float: "left"
    },
    chip: {
        marginRight: "5px",
        marginBottom: "5px"
    },
    chipBox: {
        float: "left"
    },
    buttonBox: {
        float: "right",
        margin: "3px"
    },
    button: {
        fontSize: "24px",
        padding: "5px",
        marginBottom: "5px",
        backgroundColor: "#e0e0e0",
        marginLeft: "5px"
    },
    ellipsis: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        padding: "0",
        margin: "0",
        maxWidth: "150px"
    },
    icon: {
        fontSize: "14px"
    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    checkbox: {
        backgroundColor: Colors.primaryColor,
        '&:hover': {
            backgroundColor: Colors.primaryColor,
            filter: "brightness(85%)",
        }
    }
}));

