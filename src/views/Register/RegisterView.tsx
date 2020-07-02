import React from 'react';
import RegisterForm from '../../components/RegisterForm/RegisterForm';

interface RegisterProps {
}

function RegisterScreen(props: RegisterProps) {
    return (
        <React.Fragment>
            <RegisterForm />
        </React.Fragment>
    )
}

export default RegisterScreen;