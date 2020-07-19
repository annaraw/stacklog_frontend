import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import UserService from '../../../services/UserService';
import {
    Card,
    IconButton,
    TextField,
    CardContent,
    Typography,
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { loginStyles } from './LoginFormStyles';

const LoginForm: FunctionComponent<{}> = props => {
    const classes = loginStyles();
    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const login = (event: any) => {
        setLoading(true)
        event.preventDefault();

        let user = {
            username: username,
            password: password
        };

        UserService.login(user.username, user.password).then((data) => {
            setLoginError(false)
            setLoading(false)
            //redirect to home view
            window.location.href = "/";
        }).catch((e) => {
            setLoading(false)
            setLoginError(true)
            console.error(e);
        });
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Login
                    </Typography>
                    <TextField
                        className={classes.textField}
                        id="stacklog-email-field"
                        label="E-Mail"
                        variant="outlined"
                        fullWidth
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <FormControl className={classes.textField} fullWidth variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="stacklog-password-field"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            labelWidth={70}
                        />
                    </FormControl>
                    {(loginError ?
                        <Alert
                            className={classes.textField}
                            severity="error"
                            onClose={() => setLoginError(false)}
                        >Email and password do not match!
                        </Alert>
                        : <span></span>
                    )}

                    <Button
                        variant="contained"
                        className={classes.button}
                        startIcon={loading ? <CircularProgress /> : <LockOpenIcon />}
                        onClick={(e) => login(e)}
                    >
                        Login
                    </Button>
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default LoginForm;