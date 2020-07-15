import { Colors } from "../../../util/constants";

export const projectViewStyles = () => ({
    root: {
        
    },
    menuBar: {
        width: "100%",
        height: "40px",
        backgroundColor: Colors.secondaryColor,
        position: "relative",
        paddingTop: "5px",
        paddingBottom: "5px",
    },
    projectsWrapper: {
        width: "80%", 
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: "10px",
        gridAutoRows: "minmax(auto, auto)",
    },
    project: {
        display: "grid",
    },
    createProjectBtn: {
        right: 10,
        position: "absolute",
    },
});