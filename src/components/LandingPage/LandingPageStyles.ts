import { makeStyles } from '@material-ui/core';
import LandingPagePic from './Images/LandingPagePic.png'
import { url } from 'inspector';

export const LandingPageStyles = makeStyles ((theme) =>({

    root: {
        flexGrow: 1,
        
    },
    
    appBar: {
       // margin-bottom: theme.spacing(2),
    },

    homeButton: {
        marginRight: theme.spacing(2),
        //background: 'url(${LandingPagePic})'
    },
    title: {
        flexGrow: 1,
    },
    buttonColor: {
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
   
   
    
}))