import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Drawer, Box, Button, IconButton, Tooltip, Snackbar, CircularProgress } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { Project, Member, IProjectRequest } from '../../../models/models';
import { PersonaComponent } from '../personaCard/Persona';
import { projectFormStyles } from './ProjectFormStyles';
import ProjectService from '../../../services/ProjectService';
import UserService from '../../../services/UserService';


/**
 * Project Form
 * Input Fields for Project Creation
 * 
 */
const InputForm: FunctionComponent<{
    projects: Project[]; setProjects: (projects: Project[]) => void, collegues: Member[]
}> = props => {
    const { projects, collegues, setProjects } = props;
    const formTitle = "Create Project";
    const classes = projectFormStyles()

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [member, setMember] = useState("");
    const [team, setTeam] = useState<Member[]>([]);
    const [error, setError] = useState(false)
    const [alreadyInTeam, setAlreadyInTeam] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => setIsOpen(false));
    const submit = (): void => {
        if (!checkInput()) {
            setError(true)
            return
        }
        setLoading(true)
        const newProject: IProjectRequest = {
            title: title,
            description: description,
            team: team.map(member => member.id).concat(UserService.getCurrentUser().id),
            leader: UserService.getCurrentUser().id
        }
        ProjectService.addProject(newProject).then((res) => {
            //@ts-ignore
            setProjects([...projects, res.project])
            setLoading(false)
            setIsOpen(false);

            //@ts-ignore
            setFeedbackMessage(res.message)
            setShowFeedback(true)
            //reset input
            setTitle("");
            setDescription("");
            setMember("");
            setTeam([]);
            setError(false)
        }).catch(err => {
            setLoading(false)
            setFeedbackMessage(err)
            setShowFeedback(true)
            console.log(err)
        })
    }

    const checkInput = (): boolean => {
        if (!title || !description) {
            return false
        }
        return true
    }

    const comboBoxBasicOptions = collegues.map(person => {
        return (
            { title: person.name + " " + person.lastName }
        )
    })

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowFeedback(false);
    };

    return (
        <div>
            <Button className={classes.createProjectBtn} onClick={openPanel} variant="contained">{formTitle}</Button>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={dismissPanel}
                className={classes.drawer}
            >
                <Box className={classes.box}>
                    <div className={classes.drawerHeading}>
                        <p><strong>{formTitle}</strong></p>
                        <Tooltip title="Close">
                            <IconButton
                                aria-label="close"
                                className={classes.closeButton}
                                onClick={dismissPanel}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    <TextField
                        label="Title "
                        className={classes.textField}
                        required
                        error={(!title) && error}
                        helperText={(!title && error) ? "Needs to be filled out" : ""}
                        fullWidth
                        variant="outlined"
                        placeholder="Set a title"
                        defaultValue={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <TextField
                        label="Description "
                        className={classes.textField}
                        required
                        error={(!description) && error}
                        helperText={(!description && error) ? "Needs to be filled out" : ""}
                        fullWidth
                        variant="outlined"
                        placeholder="Set a description"
                        defaultValue={description}
                        multiline rows={7}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                    <div className={classes.memberContainer}>
                        <Autocomplete
                            id="projects-member-textfield"
                            className={classes.textField}
                            fullWidth
                            options={comboBoxBasicOptions}
                            getOptionLabel={option => option.title}
                            onChange={(event, value) => {
                                setAlreadyInTeam(false);
                                (value) ? setMember(value.title) : setMember("")
                            }}
                            renderInput={(params) => <TextField {...params} label="Add Team member" variant="outlined" />}
                        />
                        <Tooltip title="Add member">
                            <IconButton
                                onClick={() => {
                                    const newMember = collegues.find(person =>
                                        (person.name + " " + person.lastName) === member
                                    )
                                    //@ts-ignore
                                    if (!team || (newMember && !team.includes(newMember))) {
                                        //@ts-ignore
                                        setTeam([...team, newMember])
                                    } else {
                                        setAlreadyInTeam(true)
                                    }
                                }}
                                className={classes.iconButton}
                            >
                                <AddIcon fontSize="inherit" />
                            </IconButton>
                        </Tooltip>
                    </div>
                    {(alreadyInTeam) ?
                        <Alert variant="filled" severity="info" color="error" onClose={() => setAlreadyInTeam(false)}>
                            {(member) ? <span><strong>{member}</strong> is already in the team</span> : <span>No person selected</span>}
                        </Alert>
                        : <span></span>}

                    {team.map(member => {
                        return (
                            <PersonaComponent
                                person={member}
                                key={member.id}
                                deleteItem={() => {
                                    let newTeam = team;
                                    const index = newTeam.indexOf(member);
                                    if (index > -1) {
                                        newTeam.splice(index, 1);
                                    }
                                    setTeam([...newTeam])
                                }}
                            />
                        )
                    })}
                </Box>
                <div className={`${classes.box} ${classes.drawerFooter}`}>
                    {loading ?
                        <CircularProgress />
                        : <span></span>}

                    <div className={classes.buttonContainer}>
                        <Button
                            variant="contained"
                            className={classes.defaultButton}
                            onClick={dismissPanel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            className={classes.primaryButton}
                            onClick={submit}
                        >
                            Create
                        </Button>
                    </div>
                </div>
            </Drawer>
            <Snackbar open={showFeedback} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </div >
    );
};

export default InputForm;