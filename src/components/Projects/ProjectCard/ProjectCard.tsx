import * as React from 'react';
import { FunctionComponent, useState } from 'react';
import { Card, CardHeader, IconButton, CardContent, Typography, Menu, MenuItem, ListItemText, Snackbar, Button, CardActions } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Alert } from '@material-ui/lab';

import { projectCardStyles } from './ProjectCardStyles';
import ProjectService from '../../../services/ProjectService';
import ProjectForm from '../../Forms/ProjectForm/ProjectForm';
import DialogForm from '../../Forms/Dialog';
import { PersonaSmall } from '../PersonaCard/PersonaSmall';
import { Project, Member } from '../../../models/models';

const ProjectCard: FunctionComponent<{
    project: Project,
    projects: Project[],
    collegues: Member[],
    setProjects: (projects: Project[]) => void,
    hideShowBacklog?: boolean,
}> = props => {
    const classes = projectCardStyles();
    const { project, projects, collegues, setProjects, hideShowBacklog } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const [deleteError, setdeleteError] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false)
    const [feedbackMessage, setFeedBackMessage] = useState<string>("")

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
        }).catch(error => {
            setdeleteError(true)
            if (error === "Forbidden") {
                setFeedBackMessage("Only the creator of the team can delete/update this project")
            } else {
                setFeedBackMessage(error)
            }
            setShowDeleteDialog(false)
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
            {!hideShowBacklog &&
                <CardActions className={classes.actions}>
                    <Button
                        size="small"
                        color="secondary"
                        onClick={() => window.location.href = "/project?projectID=" + project.id}
                    >
                        Show Backlog
                </Button>
                </CardActions>}
            <Snackbar open={deleteError} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    Could not delete Project. Error: {feedbackMessage}
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
                Are you sure you want to delete the project {<b>{project.title}</b>} with the corresponding Backlog items?
            </DialogForm>
        </Card >
    );
};

export default ProjectCard;