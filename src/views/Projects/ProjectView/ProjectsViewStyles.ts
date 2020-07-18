import { Colors } from "../../../util/constants";

export const projectViewStyles = () => ({
    root: {

    },
    addButton: {
        backgroundColor: Colors.primaryColor,
        WebkitBoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        MozBoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        BoxShadow: "4px 4px 10px -2px rgba(0,0,0,0.5)",
        color: "white",
        '&:hover': {
            backgroundColor: Colors.primaryColor,
            filter: "brightness(85%)",
        }
    },
    menuBar: {
        position: "fixed",
        right: "20px",
        bottom: "20px",
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
    noItemsDialog: {
        width: "300px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20%",
        textAlign: "center"
    }
});