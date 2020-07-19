import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import {
    IconButton,
    TextField,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    FormHelperText,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { loginDataStyles } from './LoginDataStyles';

const LoginDataForm: FunctionComponent<{
    email: string,
    password: string,
    confirmPassword: string,
    registerError: boolean,
    errorMessage: string,
    setEmail: (email: string) => void,
    setPassword: (password: string) => void,
    setConfirmPassword: (password: string) => void
    setRegisterError: (error: boolean) => void
}> = props => {

    const { email, password, confirmPassword, registerError, errorMessage,
        setEmail, setPassword, setConfirmPassword, setRegisterError } = props;
    const classes = loginDataStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword)
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <React.Fragment>
            <TextField
                className={classes.textField}
                id="stacklog-email-field"
                label="E-Mail"
                variant="outlined"
                type="email"
                value={email}
                error={registerError && !email}
                helperText={(registerError && !email) ? "Field required" : ""}
                fullWidth
                onChange={(event) => setEmail(event.target.value)}
            />
            <FormControl className={classes.textField} fullWidth variant="outlined">
                <InputLabel htmlFor="stacklog-password-field">Password</InputLabel>
                <OutlinedInput
                    id="stacklog-password-field"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    error={registerError && !password}
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
                {(registerError && !password) ?
                    <FormHelperText id="component-error-text">Passwords do not match</FormHelperText> :
                    <span></span>}
            </FormControl>
            <FormControl className={classes.textField} fullWidth variant="outlined">
                <InputLabel htmlFor="stacklog-password-field">Confirm Password</InputLabel>
                <OutlinedInput
                    id="stacklog-password-field"
                    type={showConfirmPassword ? 'text' : 'password'}
                    error={(password !== confirmPassword) ? true : false}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => { setConfirmShowPassword(!showConfirmPassword) }}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={135}
                />
                {(password !== confirmPassword) ?
                    <FormHelperText id="component-error-text">Passwords do not match</FormHelperText> :
                    <span></span>}
            </FormControl>
            {(registerError ?
                <Alert
                    className={classes.textField}
                    severity="error"
                    onClose={() => setRegisterError(false)}
                >{errorMessage}
                </Alert>
                : <span></span>
            )}

        </React.Fragment>
    );
};

export default LoginDataForm;