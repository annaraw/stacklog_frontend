import React from 'react';
import clsx from 'clsx';
import { useState } from 'react'
import {
    AppBar, Toolbar, Drawer,
    IconButton, Typography, CssBaseline, ListItem, ListItemText, List, Divider, ListItemIcon, useTheme, Button
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import { menuBarStyles } from './MenuBarStyles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import UserService from '../../services/UserService';
import { Colors } from '../../util/constants';

interface MenuBarProps {
    title: string,
    disableButton?: boolean,
}

function MenuBar(props: MenuBarProps) {

    const classes = menuBarStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                elevation={0} 
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar style={{ backgroundColor: Colors.primaryColor }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        className={classes.menuIcon}
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        size='medium'
                        onClick={() => { window.location.href = "/" }}
                        disableRipple={true}
                        disableTouchRipple
                        disableFocusRipple
                    >
                        <img src="./assets/logo_white.svg" className={classes.image} />
                    </IconButton>
                    <div style={{ right: "20px", position: "absolute" }}>
                        <Button variant="outlined" className={classes.loginBtn}
                            onClick={() => { !UserService.getCurrentUser().id ? window.location.href = "/login" : UserService.logout() }}>
                            {UserService.getCurrentUser().id ? <span>Logout</span> : <span>Login</span>}
                        </Button>
                        {UserService.getCurrentUser().id ?
                            <p style={{ float: "right", marginRight: "20px" }}>
                                Logged in: <strong>{UserService.getCurrentUser().username}</strong>
                            </p>
                            :
                            <Button variant="outlined" className={classes.loginBtn}
                                onClick={() => { !UserService.getCurrentUser().id ? window.location.href = "/register" : UserService.logout() }}>
                                <span>Sign up</span>
                            </Button>
                        }
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem button key="text2" onClick={() => { window.location.href = "/home" }}>
                        <ListItemIcon> <HomeIcon /></ListItemIcon>
                        <ListItemText primary="Planner Overview" />
                    </ListItem>
                    <ListItem button key="text2" onClick={() => { window.location.href = "/projects" }}>
                        <ListItemIcon> <PeopleIcon /></ListItemIcon>
                        <ListItemText primary="My Projects" />
                    </ListItem>
                    <ListItem button key="text2" onClick={() => { window.location.href = "#" }}>
                        <ListItemIcon> <ChatIcon /></ListItemIcon>
                        <ListItemText primary="Contact Us" />
                    </ListItem>
                    <ListItem button key="text2" onClick={() => { window.location.href = "#" }}>
                        <ListItemIcon> <SettingsIcon /></ListItemIcon>
                        <ListItemText primary="Settings" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Typography paragraph>
                    Hier ist der Inhalt
                </Typography>
            </main>
        </div>

    )
}

export default MenuBar;