import { makeStyles } from "@material-ui/core";

export const menuBarStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    drawerDiv: {
        width: "400px",
    },
    image: {
        width: '120px',
        marginBottom: "-4px",
        marginTop:"4px"
    },
    menuOption: {
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "2px",
        marginRight: "10px",
    },
    menuIcon: {
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "2px",
        marginRight: "10px",
    },
    menuIcons: {
        marginLeft: "10px"
    },
    menuTitle: {
        marginTop: "10px",
        marginBottom: "10px",
        marginLeft: "10px",
    },
    loginBtn: {
        position: "absolute",
        right: "20px",
        color: "white"
    }
}));