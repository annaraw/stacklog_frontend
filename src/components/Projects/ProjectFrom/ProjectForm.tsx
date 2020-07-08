import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, IconButton, Tooltip, Snackbar } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';

import { Project, Member, IProjectRequest, IProjectUpdateProps } from '../../../models/models';
import { projectFormStyles } from './ProjectFormStyles';
import { PersonaComponent } from '../PersonaCard/Persona';
import UserService from '../../../services/UserService';
import DrawerForm from '../../Form/DrawerForm';
import ProjectService from '../../../services/ProjectService';

/**
 * Project Form
 * Input Fields for Project Creation
 * 
 */
const ProjectForm: FunctionComponent<{
    formTitle: string,
    isOpen: boolean,
    projects: Project[],
    collegues: Member[],
    project?: Project,
    formType: "Create" | "Update",
    setIsOpen: (open: boolean) => void,
    setProjects: (projects: Project[]) => void,
}> = props => {
    const { projects, collegues, isOpen, formType, formTitle, setProjects, project, setIsOpen } = props;
    const classes = projectFormStyles()
    const [title, setTitle] = useState((project) ? project.title : "");
    const [description, setDescription] = useState(project ? project.description : "");
    const [member, setMember] = useState("");
    const [team, setTeam] = useState<Member[]>(project ? project.team : []);
    const [error, setError] = useState(false)
    const [alreadyInTeam, setAlreadyInTeam] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showFeedback, setShowFeedback] = useState(false)
    const [feedbackMessage, setFeedbackMessage] = useState("")

    const dismissPanel = (() => setIsOpen(false));

    const submit = async (): Promise<void> => {
        if (!checkInput()) {
            setError(true)
            return
        }
        setLoading(true)

        try {
            if (formType === "Create") {
                await sendItemToDataBase()
            } else if (formType === "Update") {
                await updateItemInDataBase()
            } else {
                setFeedbackMessage("Fatal error")
                setShowFeedback(true)
            }

            setLoading(false)
            setShowFeedback(true)

            //reset input
            setTitle("");
            setDescription("");
            setMember("");
            setTeam([]);
            setError(false)
            setIsOpen(false);
        } catch (err) {
            setLoading(false)
            setFeedbackMessage(err)
            setShowFeedback(true)
            console.log(err)
        }
    }

    const sendItemToDataBase = async () => {
        const newProject: IProjectRequest = {
            title: title,
            description: description,
            team: [UserService.getCurrentUser().id].concat(team.map(member => member.id)),
            leader: UserService.getCurrentUser().id
        }
        let response = await ProjectService.addProject(newProject)
        //@ts-ignore
        setFeedbackMessage(response.message)
        //@ts-ignore
        setProjects([...projects, response.item])
    }

    const updateItemInDataBase = async () => {
        let updateProps: IProjectUpdateProps = {}
        if (!project) {
            setFeedbackMessage("No item to update")
            setShowFeedback(true)
            return
        }
        if (title !== project.title) {
            updateProps.title = title
        } else if (description !== project.description) {
            updateProps.description = description
        } else if (team !== project.team) {
            updateProps.team = team.map(member => member.id)
        }
        try {
            let response = await ProjectService.updateProject(project.id, updateProps)
            let updatedProjects = [...projects]
            const projectIndex = updatedProjects.findIndex(item => item.id === project.id)
            if (projectIndex) {
                //@ts-ignore
                updatedProjects[projectIndex] = response.item
                setProjects([...updatedProjects])
            } else {
                setFeedbackMessage("No item found to update")
                setError(true)
            }
            //@ts-ignore
            setFeedbackMessage(response.message)
        } catch (error) {
            setFeedbackMessage(error)
            setError(true)
        }
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
        <>
            <DrawerForm
                formTitle={formTitle}
                isOpen={isOpen}
                loading={loading}
                formType={project ? "Update" : "Create"}
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
        </>
    );
};

export default ProjectForm;