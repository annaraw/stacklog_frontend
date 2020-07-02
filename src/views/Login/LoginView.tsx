import React from 'react';
import LoginComponent from '../../components/LoginView/LoginForm';
import { loginViewStyle } from './LoginViewStyles';

interface LoginProps {
}

function LoginScreen(props: LoginProps) {
    const classes = loginViewStyle();
    return (
        <div className={classes.root}>
            <LoginComponent />
        </div>
    )
}

export default LoginScreen;