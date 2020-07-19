import React from 'react';
import LoginForm from '../../components/UserComponents/LoginForm/LoginForm';
import { loginViewStyle } from './LoginViewStyles';

interface LoginProps {
}

function LoginScreen(props: LoginProps) {
    const classes = loginViewStyle();
    return (
        <div className={classes.root}>
                <LoginForm />
        </div>
    )
}

export default LoginScreen;