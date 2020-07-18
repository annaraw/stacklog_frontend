import React from 'react';
import LoginForm from '../../components/UserComponents/LoginForm/LoginForm';
import { loginViewStyle } from './LoginViewStyles';
import MenuBar from '../../components/MenuBar/MenuBar';

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