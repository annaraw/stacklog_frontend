import { makeStyles } from "@material-ui/core";
import { Colors } from "../../../util/constants";

export const projectCardStyles = makeStyles((theme) => ({
    root: {
        width: "90%",
        height: "90%",
        margin: "5%",
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "thin",
        position: "relative",
        borderColor: Colors.secondaryColor,
        '&:hover': {
            borderColor: "black",
        }
    },
    progressBar: {
        height: "10px",
        position: "relative",
        background: "lightgrey",
        boxShadow: "inset 0 -1px 1px rgba(255, 255, 255, 0.3)",
        '&>span': {
            display: "block",
            height: "100%",
            backgroundColor: "green",
            boxShadow: "inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 - 2px 6px rgba(0, 0, 0, 0.4)",
            position: "relative",
            overflow: "hidden",
        }
    },
    cardInfo: {
        marginBottom: "30px",
    },
    personas: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, 32px)",
        gridGap: "5px",
        gridAutoRows: "minmax(auto, auto)",
    },
    singlePersona: {
        height: "32px",
        width: "32px"
    },
    actions: {
        position: "absolute",
        bottom: "0"
    },
    cardContent: {
        marginBottom: "20px"
    }

}));