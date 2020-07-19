import React from 'react';
import RegisterForm from '../../components/UserComponents/RegisterForm/RegisterForm';
import { registerViewStyle } from './RegisterViewStyles';

interface RegisterProps {
}

function RegisterScreen(props: RegisterProps) {
    const classes = registerViewStyle();
    return (
        <div className={classes.root}>
            <RegisterForm />
        </div>
    )
}

export default RegisterScreen;