import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import UserService from '../../../services/UserService';
import {
    Card,
    CardContent,
    Typography,
    Button,
    MobileStepper,
    useTheme,
    CircularProgress,
} from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CheckIcon from '@material-ui/icons/Check';
import { registerStyles } from './RegisterFormStyles';
import LoginDataForm from './LoginDataForm/LoginDataForm';
import { Colors } from '../../../util/constants';
import PersonalDataForm from './PersonalDataForm/PersonalDataForm';
import PlanSelectForm from './PlanSelectForm/PlanSelectForm';
import { IUser } from '../../../models/models';

const RegisterForm: FunctionComponent<{}> = props => {
    const classes = registerStyles();

    const [activeStep, setActiveStep] = useState(0);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [registerError, setRegisterError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("An Error occurd")
    const [firstname, setFirstname] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [subscriptionPlan, setSubscriptionPlan] = useState("Student");
    const [companyName, setCompanyName] = useState("");
    const [loading, setLoading] = useState(false)
    const theme = useTheme();

    const signup = (event: any) => {
        event.preventDefault();

        //TODO check if all needed fields are correctly filled
        if (!checkValidation()) {
            setRegisterError(true)
            setErrorMessage("Missing input")
            setActiveStep(0)
            return
        } else {
            setRegisterError(false)
        }
        setLoading(true)

        let user: IUser = {
            username: email,
            password: password,
            email: email,
            firstname: firstname,
            surname: surname,
            role: role,
            subscriptionPlan: subscriptionPlan,
            companyName: companyName,
        };

        UserService.register(user).then(() => {
            setLoading(false)
            window.location.href = "/";
        }).catch((e) => {
            setLoading(false)
            setErrorMessage(e)
            setRegisterError(true)
            setActiveStep(0)
        })
    }

    const checkValidation = () => {
        if (!email || !password || !firstname || !surname || !subscriptionPlan
            || (subscriptionPlan === "corporate" && !companyName)) {

            return false
        }
        return true
    }

    const getStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <LoginDataForm
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        registerError={registerError}
                        errorMessage={errorMessage}
                        setEmail={setEmail}
                        setPassword={setPassword}
                        setConfirmPassword={setConfirmPassword}
                        setRegisterError={setRegisterError}
                    />
                )
            case 1:
                return (
                    <PersonalDataForm
                        firstname={firstname}
                        surname={surname}
                        role={role}
                        registerError={registerError}
                        setFirstname={setFirstname}
                        setSurname={setSurname}
                        setRole={setRole}
                    />
                )
            case 2:
                return (
                    <React.Fragment>
                        <PlanSelectForm
                            subscriptionPlan={subscriptionPlan}
                            companyName={companyName}
                            registerError={registerError}
                            setSubscriptionPlan={setSubscriptionPlan}
                            setCompanyName={setCompanyName}
                        />
                        <Button
                            variant="contained"
                            className={classes.button}
                            startIcon={loading ? <CircularProgress /> : <CheckIcon />}
                            onClick={(e) => signup(e)}
                        >
                            Sign up
                        </Button>
                    </React.Fragment>
                )
            default:
                return (
                    <React.Fragment>
                        <p>Sorry, something went wrong</p>
                    </React.Fragment>
                )
        }
    }

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <React.Fragment>
            <Card className={classes.root}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Register
                    </Typography>
                    {getStepContent(activeStep)}

                    <MobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        color={Colors.primaryColor}
                        activeStep={activeStep}
                        className={classes.stepper}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === 2}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                </CardContent>
            </Card>
        </React.Fragment>
    );
};

export default RegisterForm;