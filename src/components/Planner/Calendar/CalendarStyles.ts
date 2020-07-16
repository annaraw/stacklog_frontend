import { makeStyles } from "@material-ui/core";

export const calendarStyles = makeStyles((theme) => ({
    calendars: {
        display: "grid",
        position: "absolute",
        gridTemplateColumns: "1fr 3fr",
        height: "100%"
    },
    schedule: {
        margin: "0 20px",
    },
    calendar: {
        backgroundColor: "white",
        marginLeft: "20px",
        padding: "20px"
    },
    menubar: {
        height: "40px",
        position: "relative",
        marginLeft: "20px",
        marginRight: "20px",
        borderBottom: "3px solid black"
    },
    calendarTitle: {
        fontSize: "25px",
        marginRight: "20px",
        fontWeight: "bold",
        position: "absolute",
        right: "0px",
        top: "0px"
    },
    importButton: {
        position: "absolute",
        left: "0px",
        top: "0px"
    },
    weekdays: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
    },
    calendarContent:{
        height: "95%",
    }

}));