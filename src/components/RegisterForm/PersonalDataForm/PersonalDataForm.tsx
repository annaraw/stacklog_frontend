import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    TextField,
} from '@material-ui/core';
import { personalDataStyles } from './PersonalDataStyles';


const PersonalDataForm: FunctionComponent<{
    firstname: string,
    surname: string,
    role: string,
    registerError: boolean,
    setFirstname: (firstname: string) => void,
    setSurname: (surname: string) => void,
    setRole: (role: string) => void
}> = props => {

    const { firstname, surname, role, registerError,
        setFirstname, setSurname, setRole } = props;
    const classes = personalDataStyles();

    return (
        <React.Fragment>
            <TextField
                className={classes.textField}
                id="stacklog-firstname-field"
                label="First name"
                variant="outlined"
                value={firstname}
                required
                error={registerError && !firstname}
                helperText={(registerError && !firstname) ? "Field required" : ""}
                fullWidth
                onChange={(event) => setFirstname(event.target.value)}
            />
            <TextField
                className={classes.textField}
                id="stacklog-surname-field"
                label="Surname"
                variant="outlined"
                value={surname}
                required
                error={registerError && !surname}
                helperText={(registerError && !surname) ? "Field required" : ""}
                fullWidth
                onChange={(event) => setSurname(event.target.value)}
            />
            <TextField
                className={classes.textField}
                id="stacklog-role-field"
                label="Role"
                variant="outlined"
                value={role}
                fullWidth
                onChange={(event) => setRole(event.target.value)}
            />
        </React.Fragment>
    );
};

export default PersonalDataForm;