import React from 'react';
import { Box, Button } from '@material-ui/core';

import LandingPagePic from './Images/LandingPagePic.png';
import { LandingPageStyles } from "./LandingPageStyles";
import SingleWorker from './Images/SingleWorker.png';
import TeamWorkers from './Images/TeamWorkers.png';
import './LandingPage.css'
import Link from '@material-ui/core/Link';
import MenuBar from '../MenuBar/MenuBar';

function LandingPage() {
    const classes = LandingPageStyles();
    return (
        <React.Fragment >
            <MenuBar title="LandingPage" disableButton={true} />

            <div className='container'>
                <img src={LandingPagePic} alt="landing-page-pic" className='landingPagePic' />

                <div className='text-header-start' >
                    <h2>WELCOME TO STACKLOG</h2>
                </div>
                <div className='text-description-start'>
                    <h2> Become a more organized individual</h2>
                </div>
                <div>
                    <Button variant="outlined" className={classes.buttonColor}
                        onClick={() => {
                            window.location.href = "/login"
                        }}>
                        <p>Get started </p>
                    </Button>
                </div>

            </div>

            <div className='containerBox' >

                <Box className='box' >
                    <div>
                        <img src={SingleWorker} alt="single-worker-pic" className='icons' />
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
                <Box className='box'>
                    <div>
                        <img src={TeamWorkers} alt="team-worker-pic" className='icons' />
                    </div>
                    <div>
                        <h2>Increase your team's efficiency</h2>
                    </div>

                    <div className='text-description'>
                        <p>Managing your team's to-do has never been that easy.</p>
                        <p>Assign a project's task to an explicit member, or let them</p>
                        <p>choose from a pool of tasks</p>
                    </div>
                </Box>

            </div>
            <div className='footer'>
                <Box >
                    <p>
                        <Link color="inherit" className='link'>
                            {'Privacy Policy '}
                        </Link>

                        <Link color="inherit" className='link'>
                            {' Product '}
                        </Link>

                        <Link color="inherit" className='link'>
                            {' Pricing '}
                        </Link>

                        <Link color="inherit" className='link'>
                            {' Partners '}
                        </Link>

                        <Link color="inherit" className='link'>
                            {' Contact Us'}
                        </Link>
                    </p>
                </Box>
            </div>


        </React.Fragment >

    )
}

export default LandingPage;