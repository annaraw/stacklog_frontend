import React from 'react';
import RegisterForm from '../../components/UserComponents/RegisterForm/RegisterForm';
import MenuBar from '../../components/MenuBar';
import { registerViewStyle } from './RegisterViewStyles';

interface RegisterProps {
}

function RegisterScreen(props: RegisterProps) {
    const classes = registerViewStyle();
    return (
        <div className={classes.root}>
            <MenuBar title="Sign up" />
            <RegisterForm />
        </div>
    )
}

export default RegisterScreen;