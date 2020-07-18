import { makeStyles } from "@material-ui/core";
import { Colors } from "../../util/constants";

export const loginViewStyle = makeStyles({
    root: {
        background: "url('./assets/login_page.png')",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        height: "calc(100vh - 64px)"
    },
});