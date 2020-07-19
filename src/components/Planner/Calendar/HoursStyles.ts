import { makeStyles } from "@material-ui/core";
import { Colors, hourHeight } from "../../../util/constants";

export const hoursStyles = makeStyles((theme) => ({
    boardWrapper: {
        display: "flex",
        width: "100%",
        height: hourHeight
    },
    hours: {
        display: "flex",
        borderBottom: "1px dotted black",
        height: hourHeight
    },
    title: {
        width: "55px",
        paddingTop: "10px",
    },
    contentHover: {
        backgroundColor: Colors.secondaryColor,
        borderRadius: "4px",
        width: "100%",
        height: hourHeight,
    },
    content: {
        borderRadius: "0",
        width: "100%",
        height: hourHeight,
    }
}));