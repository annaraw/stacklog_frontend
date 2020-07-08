import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
} from '@material-ui/core';
import { planSelectStyles } from './PlanSelectStyles';

const PlanSelectForm: FunctionComponent<{
    subscriptionPlan: string,
    companyName: string,
    registerError: boolean,
    setSubscriptionPlan: (plan: string) => void,
    setCompanyName: (name: string) => void,
}> = props => {

    const { subscriptionPlan, companyName, registerError, setSubscriptionPlan, setCompanyName } = props;
    const classes = planSelectStyles();

    return (
        <React.Fragment>
            <FormControl variant="outlined" fullWidth className={classes.textField}>
                <InputLabel id="demo-simple-select-outlined-label">Subscription Plan</InputLabel>
                <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={subscriptionPlan}
                    onChange={(event) => setSubscriptionPlan(event.target.value as string)}
                    label="Subscription Plan"
                >
                    <MenuItem value={"Student"}>Student</MenuItem>
                    <MenuItem value={"Paid"}>Paid</MenuItem>
                    <MenuItem value={"Corporate"}>Corporate</MenuItem>
                </Select>
            </FormControl>
            {subscriptionPlan === "Corporate" ?
                <TextField
                    className={classes.textField}
                    id="stacklog-company-name-field"
                    label="Company name"
                    variant="outlined"
                    value={companyName}
                    error={registerError && !companyName}
                    helperText={(registerError && !companyName) ? "Field required" : ""}
                    fullWidth
                    onChange={(event) => setCompanyName(event.target.value)}
                />
                : <span></span>
            }
        </React.Fragment>
    );
};

export default PlanSelectForm;