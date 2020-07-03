import { makeStyles } from "@material-ui/core";
import { Colors } from "../../util/constants";

export const registerViewStyle = makeStyles({
    root: {
        height: "100vh",
        width: "100vw",
        backgroundColor: Colors.secondaryColor,
        position: "absolute"
    },
});