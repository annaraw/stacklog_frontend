import React from 'react';
import { useState } from 'react'
import {
    AppBar, Button, Toolbar, Drawer, Box, Tooltip,
    IconButton, Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../LandingPage/Images/Logo.png';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import { menuBarStyles } from './MenuBarStyles';
import UserService from '../../services/UserService';

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
        <React.Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu"
                        onClick={openPanel} disabled={props.disableButton}>
                        <MenuIcon />
                    </IconButton>
                    <IconButton edge="start" color="inherit" aria-label="menu" size='medium'
                        onClick={() => { window.location.href = "/home" }}>
                        <img src="./assets/logo_white.svg"  className={classes.image} />
                    </IconButton>
                    <Button className={classes.loginBtn}
                        onClick={() => { !UserService.getCurrentUser().id ? window.location.href = "/login" : UserService.logout() }}>
                        {UserService.getCurrentUser().id ? <span>Logout</span> : <span>Login</span>}
                    </Button>
                </Toolbar>
            </AppBar>
            <div className={classes.drawerDiv}>
                <Drawer
                    anchor="left"
                    open={isOpen}
                    onClose={dismissPanel}
                >
                    <Box >
                        <p className={classes.menuTitle}><strong>Menu</strong></p>
                        <div className={classes.menuOption}>
                            <Button onClick={() => { window.location.href = "/home" }}>
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
        </React.Fragment >

    )
}

export default MenuBar;