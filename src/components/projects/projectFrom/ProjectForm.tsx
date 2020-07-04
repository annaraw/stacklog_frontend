import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, Button, IconButton, Tooltip, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';

import { Project, Member, IProjectRequest } from '../../../models/models';
import { projectFormStyles } from './ProjectFormStyles';
import { PersonaComponent } from '../PersonaCard/Persona';
import ProjectService from '../../../services/ProjectService';
import UserService from '../../../services/UserService';
import DrawerForm from '../../Form/DrawerForm';

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

    const memberOptions = collegues.map(person => {
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
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType="Create"
                onSubmit={submit}
                dismissPanel={dismissPanel}
            >
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
                        options={memberOptions}
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
            </DrawerForm>
            <Snackbar open={showFeedback} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={(error) ? "error" : "success"}>
                    {feedbackMessage}
                </Alert>
            </Snackbar>
        </div >
    );
};

export default InputForm;