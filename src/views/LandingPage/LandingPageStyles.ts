import { makeStyles, responsiveFontSizes } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';



export const LandingPageStyles = makeStyles ((theme) =>({

    root: {
        [theme.breakpoints.down('sm')]: {
            fontSize: "8px"
        },
        [theme.breakpoints.up('md')]: {
            fontSize:  "12px",
        },
        
    },
    landingPagePic: {
        minWidth: "100%",
        minHeight: "100%",
        marginBottom: "120px",
    },
    loginButton: {
        backgroundColor: '#6AFFA1',
        position: "absolute",
        paddingTop: '0.2%',
        top: '42% ',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        "&:hover" : {
            background: '#212121',
          }
    },
    container: {
        position: "relative",
        textAlign: "center",
        display: "flex",
    },
    headerText: {
        position: "absolute",
        top: "32%",
        left: "50%",
        transform: "translate(-50%, -50%)", 
        backgroundColor: "black",
        color: "white",
        paddingLeft: "20px",
        paddingRight: "20px",
        fontSize: "1vw",
    },
    headerDescription: {
        position: "absolute",
        top: "36.3%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "black",
        paddingLeft: "20px",
        paddingRight: "20px",
        fontSize: "1vw",
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
        color:" rgb(49, 48, 48)",
        
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
        marginLeft  : "40px",
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