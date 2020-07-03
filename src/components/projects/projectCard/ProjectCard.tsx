import * as React from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import { Project } from '../../../models/models';
import { FunctionComponent } from 'react';
import { Card, CardHeader, IconButton, CardContent, Typography, Menu, MenuItem, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { projectCardStyles } from './ProjectCardStyles';

const ProjectCard: FunctionComponent<{ project: Project }> = props => {
    const classes = projectCardStyles();
    const { project } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
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
    };

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
                            <MenuItem>
                                <EditIcon fontSize="small" />
                                <ListItemText primary="Edit" style={{ paddingLeft: "10px" }} />
                            </MenuItem>
                            <MenuItem>
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
        </Card >
    );
};

export default ProjectCard;