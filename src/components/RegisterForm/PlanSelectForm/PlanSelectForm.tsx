import * as React from 'react';
import { FunctionComponent } from 'react';
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@material-ui/core';
import { planSelectStyles } from './PlanSelectStyles';

const PlanSelectForm: FunctionComponent<{
    subscriptionPlan: string,
    setSubscriptionPlan: (plan: string) => void
}> = props => {

    const { subscriptionPlan, setSubscriptionPlan } = props;
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
            {/* TODO show corporate name field if plan = corporate */}
        </React.Fragment>
    );
};

export default PlanSelectForm;