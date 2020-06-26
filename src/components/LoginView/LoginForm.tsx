import * as React from 'react';
import {
    DefaultButton, SearchBox
} from '@fluentui/react';
import './LoginForm.css'
import { FunctionComponent, useState } from 'react';
import UserService from '../../services/UserService';


const LoginComponent: FunctionComponent<{}> = props => {

    const [loginError, setLoginError] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (event:any) => {
        event.preventDefault();

        let user = {
            username: username,
            password: password
        };

        UserService.login(user.username, user.password).then((data) => {
            setLoginError(false)
            //redirect to home view
            window.location.href = "/";
        }).catch((e) => {
            setLoginError(true)
            console.error(e);
        });
    }

    return (
        <React.Fragment>
            <div className="cardF">
                <h1>Login</h1>
                <SearchBox
                    placeholder="Username/E-Mail"
                    iconProps={{ iconName: 'Contact' }}
                    onChange={(event, value) => setUsername(String(value))}
                />
                <SearchBox
                    placeholder="Password"
                    iconProps={{ iconName: 'Lock' }}
                    type="password"
                    onChange={(event, value) => setPassword(String(value))}
                />

                {(loginError ?
                    <p>Email and password do not match!</p>
                    : <span></span>
                )}

                <DefaultButton
                    text="LOGIN"
                    onClick={(e) => login(e)}
                />
            </div>
        </React.Fragment>
    );
};

export default LoginComponent;