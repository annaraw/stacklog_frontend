import React from 'react';
import MenuBar from '../components/MenuBar'

interface LoginProps {
}

function LoginScreen(props: LoginProps) {
    return (
        <React.Fragment>
            <MenuBar title="Login" />
            <h1>Login</h1>
        </React.Fragment>
    )
}

export default LoginScreen;