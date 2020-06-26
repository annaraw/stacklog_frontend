import React from 'react';
import { AppBar, Button, Toolbar, IconButton, Typography, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import UserService from '../services/UserService';


interface MenuBarProps {
    title: string,
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
    }));
    const classes = useStyles();
    return (
        <React.Fragment>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        {props.title}
                    </Typography>
                    <Button
                        color="inherit"
                        onClick={() => {
                            if (UserService.isAuthenticated()) {
                                UserService.logout()
                                window.location.href = "/"
                            }else {
                                window.location.href = "/login"
                            }
                        }}
                    >
                        {(UserService.isAuthenticated()) ? "Logout" : "Login"}
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment >

    )
}

export default MenuBar;