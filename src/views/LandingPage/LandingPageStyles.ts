import { makeStyles } from '@material-ui/core';
import { Colors } from '../../util/constants';



export const LandingPageStyles = makeStyles((theme) => ({

    root: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "8px"
        },
        [theme.breakpoints.up('md')]: {
            fontSize: "12px",
        },

    },
    landingPagePic: {
        width: "100%",
        marginBottom: "120px",
        backgroundImage: "url('./assets/LandingPagePic.png')",
        height: "100vh",
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },
    loginButton: {
        backgroundColor: Colors.primaryColor,
        padding: "15px",
        fontSize:"30px",
        marginTop: "30px",
        color: "white",
        paddingLeft: "80px",
        paddingRight:"80px",
        webkitBoxShadow: "0px 0px 60px -5px rgba(0,0,0,0.75)",
        mozBoxShadow: "0px 0px 60px -5px rgba(0,0,0,0.75)",
        boxShadow: "0px 0px 60px -5px rgba(0,0,0,0.75)",
        "&:hover": {
            backgroundColor: Colors.primaryColor,
            filter: "brightness(110%)",
            transition: "0.5s"
        }
    },
    container: {
        position: "relative",
        textAlign: "center",
        display: "flex",
    },
    headerText: {
        backgroundColor: "#111",
        color: "#fff",
        padding: "18px",
        fontSize: "25px",
        letterSpacing: "10px",
    },
    headerBox: {
        width: "100%",
        textAlign: "center",
        color: "#000",
        marginTop:"30vh"
    },
    headerDescription: {
        width: "100%",
        textAlign: "center",
        color: "#000",
        marginTop:"50px"
    },
    descriptionImage: {
        width: "400px",
    },
    containerBox: {
        position: "relative",
        textAlign: "center",
        display: "flex",
        marginBottom: "100px",

    },
    boxContent: {
        width: "100%",
        float: "left",
        paddingTop: "20px",

    },

    footer: {
        bottom: 0,
        position: "relative",
        textAlign: "center",
        display: "flex",
        height: "60px",
        width: "100%",
        backgroundColor: "gray",
        color: " rgb(49, 48, 48)",

    },
    footerContainerBox: {
        width: "100%",
        float: "left",
        alignContent: "center",
    },
    footerLine: {
        width: "100%",
        float: "left",
        alignContent: "center",
        fontSize: "22px",
        paddingTop: "15px",


    },
    footerBox: {
        width: "100%",
        float: "left",
        paddingLeft: "20px",
        paddingRight: "20px",
        paddingTop: "10px",

    },
    footerBoxLeft: {
        width: "100%",
        float: "left",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginLeft: "40px",
        paddingTop: "20px",
    },
    footerBoxRight: {
        width: "100%",
        float: "left",
        paddingLeft: "20px",
        paddingRight: "20px",
        marginRight: "40px",
        paddingTop: "20px",
    },


}))