import React from 'react';
import LoginComponent from '../components/LoginView/LoginForm';

interface LoginProps {
}

function LoginScreen(props: LoginProps) {
    return (
        <React.Fragment>
            <LoginComponent />
        </React.Fragment>
    )
}

export default LoginScreen;