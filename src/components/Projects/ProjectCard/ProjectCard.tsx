import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Card, CardHeader, IconButton, CardContent, Typography, Menu, MenuItem, ListItemText, Snackbar, Button, CardActions } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

import { projectCardStyles } from './ProjectCardStyles';
import ProjectService from '../../../services/ProjectService';
import ProjectForm from '../ProjectFrom/ProjectForm';
import DialogForm from '../../Form/Dialog';
import { PersonaSmall } from '../PersonaCard/PersonaSmall';
import { Project, Member } from '../../../models/models';

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
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)

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
                            <MenuItem onClick={() => setShowDeleteDialog(true)}>
                                <DeleteIcon fontSize="small" />
                                <ListItemText primary="Delete" style={{ paddingLeft: "10px" }} />
                            </MenuItem>
                        </Menu>
                    </>
                }
                title={project.title}
            />
            <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textSecondary" component="div">
                    {(project.team.length !== 0) ?
                        <div className={`${classes.cardInfo}`}>
                            <p><b>Team</b></p>
                            <div className={classes.personas}>
                                {project.team.map(member => {
                                    return <PersonaSmall member={member} />
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
            <CardActions className={classes.actions}>
                <Button
                    size="small"
                    color="secondary"
                    onClick={() => window.location.href = "/project?projectID=" + project.id}
                >
                    Show Backlog
                </Button>
            </CardActions>
            <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Could not delete Project
                </Alert>
            </Snackbar>
            <ProjectForm
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                formTitle={`Edit Project '${project.title}'`}
                projects={projects}
                setProjects={setProjects}
                collegues={collegues}
                project={project}
                formType={"Update"}
            />
            <DialogForm
                isOpen={showDeleteDialog}
                formTitle={`Delete '${project.title}'`}
                formType={"Delete"}
                onSubmit={handleDelete}
                dismissPanel={() => setShowDeleteDialog(false)}
            >
                Are you sure you want to delete the project {<b>{project.title}</b>}?
            </DialogForm>
        </Card >
    );
};

export default ProjectCard;