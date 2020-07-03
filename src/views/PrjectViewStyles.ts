import { makeStyles } from "@material-ui/core";
import { Colors } from "../util/constants";

export const projectViewStyles = makeStyles((theme) => ({
    root: {
        
    },
    menuBar: {
        width: "100%",
        height: "40px",
        backgroundColor: Colors.secondaryColor,
    },
    createProjectBtn: {
        right: 10,
    },
    projectsWrapper: {
        display: "grid",
        gridTemplateColumns: "repeat(3, minmax(300px, auto))",
        gridGap: "10px",
        gridAutoRows: "minmax(auto, auto)",
    },
    project: {
        display: "grid",
    }
}));