import { makeStyles } from "@material-ui/core";

export const calendarStyles = makeStyles((theme) => ({
    calendars: {
        display: "grid",
        position: "absolute",
        gridTemplateColumns: "0fr 3fr",
        height: "100%",
        width: "100%"
    },
    schedule: {
        margin: "0 20px",
    },
    calendar: {
        backgroundColor: "white",
        marginLeft: "20px",
        padding: "20px",
    },
    menubar: {
        height: "40px",
        position: "relative",
        marginLeft: "20px",
        marginRight: "20px",
        borderBottom: "3px solid black",
        display: "flex"
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
        position: "relative",
        left: "0px",
        top: "0px",
        paddingRight: "5px"
    },
    weekdays: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
    },
    calendarContent:{
        height: "95%",
    }

}));