import { makeStyles } from "@material-ui/core";

export const personaStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: 200,
        },
    },
    persona: {
        padding: "15px",
        overflow: "hidden",
        marginTop: "10px",
        marginBottom: "10px",
        position: "relative",
        borderStyle: "solid",
        borderColor: "lightgrey",
        borderRadius: "5px",
        borderWidth: "thin",
        '&:hover': {
            borderColor: "black",
        },
    },
    iconButton: {
        position: "absolute", 
        right: "20px", 
        top: "20px"
    }
}));