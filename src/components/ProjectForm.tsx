import * as React from 'react';
import { useState, FunctionComponent } from 'react';
import { TextField, makeStyles, Drawer, Box, Button, Icon, IconButton } from '@material-ui/core';
import { Autocomplete, Alert } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';

import { Project } from '../models/models';
import { PersonaComponent } from './persona';
import { personsDummy } from '../data/dummyData';
import { Colors } from '../util/constants';
import './ProjectForm.css'

/**
 * Project Form
 * Input Fields for Project Creation
 * 
 */
const InputForm: FunctionComponent<{ projects: Project[]; setProjects: (projects: Project[]) => void }> = props => {
    const { projects, setProjects } = props;
    const formTitle = "Create Project";

    //Hooks
    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [member, setMember] = useState("");
    const [team, setTeam] = useState([personsDummy[0], personsDummy[1], personsDummy[2]]);
    const [error, setError] = useState(false)
    const [alreadyInTeam, setAlreadyInTeam] = useState(false)

    const openPanel = (() => setIsOpen(true));
    const dismissPanel = (() => setIsOpen(false));
    const submit = (): void => {
        if (!checkInput()) {
            setError(true)
            return
        }
        const newProject: Project = {
            title: title,
            description: description,
            team: team,
            id: Math.random().toString(),
            backlogItems: 0,
            progress: 0,
        }
        projects.push(newProject);
        setProjects(projects)
        setIsOpen(false);
        //reset input
        setTitle("");
        setDescription("");
        setMember("");
        setTeam([]);
        setError(false)
    }

    const checkInput = (): boolean => {
        if (!title || !description) {
            return false
        }
        return true
    }

    const comboBoxBasicOptions = personsDummy.map(person => {
        return (
            { title: person.name + " " + person.lastName }
        )
    })

    const useStyles = makeStyles((theme) => ({
        root: {
            '& .MuiTextField-root': {
                margin: theme.spacing(1),
                width: 200,
            },
        },
        textField: {
            marginTop: "10px",
            marginBottom: "10px",
        },
        paperFullWidth: {
            overflowY: 'visible'
        },
        dialogContentRoot: {
            overflowY: 'visible'
        }
    }));

    const classes = useStyles()

    return (
        <div>
            <Button onClick={openPanel} variant="contained">{formTitle}</Button>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={dismissPanel}
                className="project-drawer"
            >
                <Box className="project-box">
                    <div className="drawer-heading">
                        <p><strong>{formTitle}</strong></p>
                        <IconButton
                            aria-label="close"
                            style={{ position: "absolute", top: "20px", right: "10px" }}
                            onClick={dismissPanel}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
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
                    <div className="drawer-addPerson"
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignContent: "space-between",
                            width: "100%",
                        }}>

                        <Autocomplete
                            id="combo-box-demo"
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
                        <IconButton
                            onClick={() => {
                                const newMember = personsDummy.find(person =>
                                    (person.name + " " + person.lastName) === member
                                )
                                if (newMember && !team.includes(newMember)) {
                                    setTeam([...team, newMember])
                                } else {
                                    setAlreadyInTeam(true)
                                }
                            }}
                            style={{ height: "48px", top: "15px" }}
                        >
                            <AddIcon fontSize="inherit" />
                        </IconButton>
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
                <div className="project-box project-drawer-footer">
                    <div className="button-container">
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: Colors.secondaryColor,
                                margin: "5px"
                            }}
                            onClick={dismissPanel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            style={{
                                backgroundColor: Colors.primaryColor,
                                margin: "5px"
                            }}
                            onClick={submit}
                        >
                            Create
                        </Button>
                    </div>

                </div>
            </Drawer>
        </div >
    );
};

export default InputForm;