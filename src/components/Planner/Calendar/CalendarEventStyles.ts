import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const calendarEventStyles = makeStyles((theme) => ({
    event: {
        backgroundColor: Colors.calendar,
        width: "20px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        //borderRadius: "1px",
        //borderStyle: "dotted",
        borderRadius: "8px",
        borderWidth: "1px",
        zIndex: 0,
        transition: "background-color .25s ease-out",
        boxShadow: "1px 1px 3px -2px rgba(0,0,0,0.75)",
        '&:hover': {
            cursor: "pointer",
        }

    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    eventCard:{
        width: "250px",
    }
}));