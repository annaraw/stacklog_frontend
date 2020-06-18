import React, { useState } from 'react';
import { DefaultButton, SearchBox } from 'office-ui-fabric-react';
import UserService from '../services/UserService';
import LoginComponent from '../components/LoginForm';

interface RegisterProps {
}

function RegisterScreen(props: RegisterProps) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);

    const signup = (event: any) => {
        event.preventDefault();

        let user = {
            username: username,
            password: password
        };

        UserService.register(user.username, user.password).then(() => {
            window.location.href = "/";
        }).catch((e) => {
            console.error(e);
            setRegisterError(true)
        })
    }

    return (
        <React.Fragment>
            <div className="cardF">
                <h1>Register NOW</h1>
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

                {(registerError ?
                    <p>Register Error!</p>
                    : <span></span>
                )}

                <DefaultButton
                    text="Sign up"
                    onClick={(e) => signup(e)}
                />
            </div>
        </React.Fragment>
    )
}

export default RegisterScreen;