import React from 'react';
import RegisterForm from '../../components/UserComponents/RegisterForm/RegisterForm';
import MenuBar from '../../components/MenuBar/MenuBar';
import { registerViewStyle } from './RegisterViewStyles';

interface RegisterProps {
}

function RegisterScreen(props: RegisterProps) {
    const classes = registerViewStyle();
    return (
        <div className={classes.root}>
            <MenuBar title="Sign up" disableButton = {true}/>
            <RegisterForm />
        </div>
    )
}

export default RegisterScreen;