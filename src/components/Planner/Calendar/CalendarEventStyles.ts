import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const calendarEventStyles = makeStyles((theme) => ({
    event: {
        backgroundColor: Colors.calendar,
        width: "20px",
        textOverflow: "ellipsis",
        overflow: "hidden",
        borderRadius: "8px",
        border: "1px solid rgba(0,0,0, 0.25)",
        zIndex: 0,
        transition: "background-color .25s ease-out",
        boxShadow: "2px 2px 3px -2px rgba(0,0,0,0.75)",
        '&:hover': {
            cursor: "pointer",
            zIndex: 99,
            filter: "brightness(75%)",
            borderColor: "black"
        }

    },
    popover: {
        pointerEvents: 'none',
    },
    paper: {
        padding: theme.spacing(1),
    },
    eventCard: {
        width: "250px",
    }
}));