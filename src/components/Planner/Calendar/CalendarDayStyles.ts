import { makeStyles } from "@material-ui/core";

export const calendarDayStyles = makeStyles((theme) => ({
    day: {
        flex: 1,
        padding: "8px",
        minWidth: "300px",
        backgroundColor: "#FFFFFF",
        '&': {
            marginLeft: "12px",
        }
    },
    weekday: {
        borderRight: "1px dotted black",
        borderLeft: "1px dotted black",
    },
    title: {
        marginBottom: "12px"
    }
}));