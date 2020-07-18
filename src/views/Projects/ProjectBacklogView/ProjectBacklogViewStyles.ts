export const projectBacklogViewStyles = () => ({
    root: {

    },
    container: {
        display: "grid",
        gridTemplateColumns: "2fr 3fr 3fr",
        gridGap: "10px",
        gridAutoRows: "minmax(auto, auto)",
        width: "95%",
        margin: "0 auto",
    },
    backButton: {
        marginTop: "20px",
        marginLeft: "20px"
    },
    infoButton: {
        marginTop: "20px",
        marginRight: "20px",
        float: "right",
    }
});