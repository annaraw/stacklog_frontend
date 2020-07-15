import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const calendarEventStyles = makeStyles((theme) => ({
    event: {
        backgroundColor: Colors.calendar,
        width: "20px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        borderRadius: "1px",
        borderStyle: "dotted",
        borderWidth: "1px",
        zIndex: 0,
        transition: "background-color .25s ease-out",
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