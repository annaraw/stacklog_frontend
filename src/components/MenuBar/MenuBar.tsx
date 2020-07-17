import React from 'react';
import clsx from 'clsx';
import { useState } from 'react'
import {
    AppBar, Button, Toolbar, Drawer, Box, Tooltip,
    IconButton, Typography, CssBaseline
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../LandingPage/Images/Logo.png';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { menuBarStyles } from './MenuBarStyles';
import UserService from '../../services/UserService';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

interface MenuBarProps {
    title: string,
    disableButton?: boolean,
}

function MenuBar(props: MenuBarProps) {

    const classes = menuBarStyles()
    const [isOpen, setIsopen] = useState(false)

    const dismissPanel = (() =>
        setIsopen(false)
    )
    const openPanel = (() =>
        setIsopen(true)
    )
    return (
        <div className = {classes.root}>
            <AppBar 
            position="fixed"
            className={clsx(classes.appBar,
                {[classes.appBarShift]: isOpen,
            })}>
                <Toolbar>
                    <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu"
                    onClick={openPanel} disabled={props.disableButton}>
                        <MenuIcon />
                    </IconButton>

                    <IconButton 
                    className={classes.menuIcon}
                    edge="start" 
                    color="inherit" 
                    aria-label="menu" 
                    size='medium'
                    onClick={() => { window.location.href = "/" }}>
                        <img src="./assets/logo_white.svg"  className={classes.image} />
                    </IconButton>

                    <Button variant =  "outlined" className={classes.loginBtn}
                        onClick={() => { !UserService.getCurrentUser().id ? window.location.href = "/login" : UserService.logout() }}>
                        {UserService.getCurrentUser().id ? <span>Logout</span> : <span>Login</span>}
                    </Button>
                </Toolbar>
            </AppBar>
            <div >
                <Drawer
                    
                    variant="permanent"
                    open={isOpen}
                    onClose={dismissPanel}
                    className={clsx(classes.drawer,{
                        [classes.drawerOpen]:isOpen, 
                        [classes.drawerClose]: !isOpen})}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: isOpen,
                            [classes.drawerClose]: !isOpen,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={dismissPanel} >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Box >
                        
                        <div  className={classes.menuOption}>
                            <Button onClick={() => { window.location.href = "/home" }} >
                                <HomeIcon className={classes.menuOption} />
                            Home
                            </Button>
                        </div>
                        <div className={classes.menuOption}>
                            <Button onClick={() => { window.location.href = '/projects' }}>
                                <PeopleOutlineIcon className={classes.menuOption} />
                                Projects
                            </Button>
                        </div>
                        <div className={classes.menuOption}>
                            <Button>
                                <SettingsIcon className={classes.menuOption} />
                                Settings
                            </Button>
                        </div>
                        <div className={classes.menuOption}>
                            <Button>
                                <PermContactCalendarIcon className={classes.menuOption} />
                                Contact Us
                            </Button>
                        </div>
                    </Box>
                </Drawer>
            </div>
        </div>

    )
}

export default MenuBar;