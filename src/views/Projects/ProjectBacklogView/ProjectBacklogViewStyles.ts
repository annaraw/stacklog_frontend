export const projectBacklogViewStyles = () => ({
    root: {

    },
    container: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gridGap: "10px",
        gridAutoRows: "minmax(auto, auto)",
        width: "80%",
        margin: "0 auto",
    },
    backButton: {
        marginTop: "20px",
        marginLeft: "20px"
    }
});