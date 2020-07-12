import React from 'react';
import { useState } from 'react'
import { AppBar, Button, Toolbar,  Drawer, Box, Tooltip,
     IconButton, Typography, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserService from '../../services/UserService';
import Logo from '../LandingPage/Images/Logo.png';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import './MenuBar.css'
import CloseIcon from '@material-ui/icons/Close';



interface MenuBarProps {
    title: string,
    disableButton: boolean,
}

function MenuBar(props: MenuBarProps) {
    const useStyles = makeStyles((theme) => ({
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
        buttonColor: {
            backgroundColor: "#6AFFA1",
        },
        
    }));
    const classes = useStyles()
    const [isOpen, setIsopen] = useState (false)

    const dismissPanel = (() => 
        setIsopen(false)
    )
    const openPanel = (() =>
        setIsopen(true)
    )
    return (
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                     onClick={openPanel} disabled = {props.disableButton}>
                        <MenuIcon /> 
                    </IconButton>
                    <IconButton edge="start"  color="inherit" aria-label="menu" size= 'medium'
                    onClick ={ () => { window.location.href = "/home"}}>
                        <img src={Logo} style={{width: '150px'}}  />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        
                    </Typography>
                    <Button className= {classes.buttonColor}
                        variant="outlined"
                        
                        onClick = {() => {window.location.href = "/"}}>
                           Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <div className = {classes.drawerDiv}>

                <Drawer
                anchor="left"
                open={isOpen}
                onClose={dismissPanel}
                >
                
                    <Box > 
                        <div className ='containerBox'>
                            <p className = 'menuOption'><strong>Menu</strong></p>
                            <Tooltip title="Close">
                                <IconButton
                                    aria-label="close"
                                    className= 'closeButton'
                                    onClick={dismissPanel}
                                >
                                    <CloseIcon fontSize="inherit" />
                                </IconButton>
                            </Tooltip>
                        </div>
                        <div className = 'menuOption'>
                            <Button onClick ={ () => { window.location.href = "/home"}}>
                            <HomeIcon className='menuOption'/>
                            Home
                            </Button>
                        </div>
                        <div className = 'menuOption'>
                            <Button onClick ={ () => { window.location.href = '/projects'}}>
                                <PeopleOutlineIcon className='menuOption'/>
                                Projects
                            </Button>
                        </div>
                        <div className = 'menuOption'>
                            <Button>
                                <SettingsIcon className='menuOption'/>
                                Settings
                            </Button>
                        </div>
                        <div className = 'menuOption'>
                            <Button>
                                <PermContactCalendarIcon className='menuOption'/>
                                Contact Us
                            </Button>
                        </div>

                    </Box>


                </Drawer> 
            </div>
        </React.Fragment >

    )
}

export default MenuBar;