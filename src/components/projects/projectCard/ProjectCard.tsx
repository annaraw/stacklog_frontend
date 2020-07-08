import * as React from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import { Project, Member } from '../../../models/models';
import { FunctionComponent, useState } from 'react';
import { Card, CardHeader, IconButton, CardContent, Typography, Menu, MenuItem, ListItemText, Snackbar } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { projectCardStyles } from './ProjectCardStyles';
import ProjectService from '../../../services/ProjectService';
import { Alert } from '@material-ui/lab';
import ProjectForm from '../ProjectFrom/ProjectForm';

const ProjectCard: FunctionComponent<{
    project: Project,
    projects: Project[],
    collegues: Member[],
    setProjects: (projects: Project[]) => void,
}> = props => {
    const classes = projectCardStyles();
    const { project, projects, collegues, setProjects } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [deleteError, setdeleteError] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const personas: IPersonaSharedProps[] = project.team.map(member => {
        return (
            {
                imageInitials: member.name[0] + member.lastName[0],
                text: member.name + " " + member.lastName,
                secondaryText: member.role,
                tertiaryText: member.email
            }
        )
    })
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setdeleteError(false)
    };

    const handleDelete = () => {
        ProjectService.removeProject(project.id).then(res => {
            console.log(res)
            window.location.reload()
        }).catch(err => {
            setdeleteError(true)
        })
    }

    return (
        <Card className={classes.root} key={project.id} >
            <CardHeader
                action={
                    <>
                        <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="customized-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem onClick={() => setIsOpen(true)}>
                                <EditIcon fontSize="small" />
                                <ListItemText primary="Edit" style={{ paddingLeft: "10px" }} />
                            </MenuItem>
                            <MenuItem onClick={handleDelete}>
                                <DeleteIcon fontSize="small" />
                                <ListItemText primary="Delete" style={{ paddingLeft: "10px" }} />
                            </MenuItem>
                        </Menu>
                    </>
                }
                title={project.title}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="div">
                    {(project.team.length !== 0) ?
                        <div className={`${classes.cardInfo}`}>
                            <p><b>Team</b></p>
                            <div className={classes.personas}>
                                {personas.map(persona => {
                                    return (
                                        <div className={classes.singlePersona} key={persona.text}>
                                            <Persona
                                                {...persona}
                                                size={PersonaSize.size32}
                                                hidePersonaDetails={true}
                                                imageAlt={persona.text}
                                                key={persona.text}
                                            />
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        : <span></span>
                    }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                    {(project.backlogItems) ?
                        <div className={classes.cardInfo}>
                            <p><b>Progress</b></p>
                            <p>{project.backlogItems} items left in the backlog</p>

                            <div className={classes.progressBar}>
                                <span style={{ width: project.progress + "%" }}></span>
                            </div>
                        </div>
                        : <span></span>
                    }
                </Typography>
                <Typography variant="body2" color="textSecondary" component="div">
                    {(project.description) ?
                        <div className={classes.cardInfo}>
                            <p><b>Description</b></p>
                            <p>{project.description}</p>
                        </div>
                        : <span></span>
                    }
                </Typography>
            </CardContent>
            <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Could not delete Project
                </Alert>
            </Snackbar>
            <ProjectForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                formTitle={`Edit Project "${project.title}"`}
                projects={projects}
                setProjects={setProjects}
                collegues={collegues}
                project={project}
                formType={"Update"}
            />
        </Card >
    );
};

export default ProjectCard;