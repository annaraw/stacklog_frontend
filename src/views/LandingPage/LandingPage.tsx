import React from 'react';
import { Box, Button } from '@material-ui/core';
import { LandingPageStyles } from "./LandingPageStyles";

import './LandingPage.css'
import Link from '@material-ui/core/Link';
import MenuBar from '../../components/MenuBar/MenuBar';

function LandingPage() {
    const classes = LandingPageStyles();
    return (
        <React.Fragment >
            <MenuBar title="LandingPage" disableButton={true} />

            <div className= {classes.container}>
                <img src="./assets/LandingPagePic.png" alt="landing-page-pic" className={classes.landingPagePic} />

                <div className= {classes.headerText} >
                    <h2>WELCOME TO STACKLOG</h2>
                </div>
                <div className= {classes.headerDescription}>
                    <h2> Become a more organized individual</h2>
                </div>
                <div>
                    <Button variant="outlined" className={classes.loginButton}
                    
                        onClick={() => {
                            window.location.href = "/login"
                        }}>
                        <p>Get started </p>
                    </Button>
                </div>
            </div>

            <div className={classes.containerBox} >
                <Box className={classes.boxContent} >
                    <div>
                        <img src="./assets/SingleWorker.png" alt="single-worker-pic" className={classes.descriptionImage} />
                    </div>
                    <div >
                        <h2>Relieve the clutter in your head</h2>
                    </div>
                    <div>
                        <p>Free your mind by writing down your upcoming tasks.</p>
                        <p>Organize your duties to become a more structured, </p>
                        <p>more creative, and free individual.</p>
                    </div>

                </Box>
                <Box className={classes.boxContent}>
                    <div>
                        <img src="./assets/TeamWorkers.png" alt="team-worker-pic" className={classes.descriptionImage} />
                    </div>
                    <div>
                        <h2>Increase your team's efficiency</h2>
                    </div>

                    <div>
                        <p>Managing your team's to-do has never been that easy.</p>
                        <p>Assign a project's task to an explicit member, or let them</p>
                        <p>choose from a pool of tasks</p>
                    </div>
                </Box>

            </div>
            <div className={classes.footer}>
                
                 
                        <Box className={classes.footerBoxLeft}>
                            <Link color="inherit" >
                                {'Privacy Policy '}
                            </Link>
                        </Box>
                        <Box className ={classes.footerLine}>
                            |
                        </Box>
                        <Box className={classes.boxContent}>
                            <Link color="inherit" >
                                {' Product '}
                            </Link>
                        </Box>
                        <Box className ={classes.footerLine}>
                            |
                        </Box>
                        <Box className={classes.boxContent}>
                            <Link color="inherit" >
                                {' Pricing '}
                            </Link>
                        </Box>
                        <Box className ={classes.footerLine}>
                            |
                        </Box>
                        
                        <Box className={classes.boxContent}>
                            <Link color="inherit" >
                                {' Partners '}
                            </Link>
                        </Box>
                        <Box className ={classes.footerLine}>
                            |
                        </Box>
                        
                        <Box className={classes.footerBoxRight}>
                            <Link color="inherit" >
                                {' Contact Us'}
                            </Link>
                        </Box>
                   
                        
            </div>


        </React.Fragment >

    )
}

export default LandingPage;