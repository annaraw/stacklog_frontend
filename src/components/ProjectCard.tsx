import * as React from 'react';
import {
    IPersonaSharedProps, Persona, PersonaSize
} from 'office-ui-fabric-react';

import './ProjectCard.css'
import { Project } from '../models/models';
import { FunctionComponent } from 'react';
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions, Collapse, makeStyles, Theme, createStyles, Menu, MenuItem, withStyles, MenuProps, ListItemIcon, ListItemText } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "90%",
            height: "90%",
            margin: "5%",
        },
    }),
);

const ProjectCard: FunctionComponent<{ project: Project }> = props => {
    const classes = useStyles();
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

        <div className="card">
            <Card className={classes.root + " border"} >
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
                                    <ListItemText primary="Edit" style={{paddingLeft: "10px"}}/>
                                </MenuItem>
                                <MenuItem>
                                    <DeleteIcon fontSize="small" />
                                    <ListItemText primary="Delete" style={{paddingLeft: "10px"}}/>
                                </MenuItem>
                            </Menu>
                        </>
                    }
                    title={project.title}
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="div">
                        {(project.team.length !== 0) ?
                            <div className="card-info card-team">
                                <p><b>Team</b></p>
                                <div style={{
                                    display: "grid",
                                    gridTemplateColumns: "repeat(auto-fill, 32px)",
                                    gridGap: "5px",
                                    gridAutoRows: "minmax(auto, auto)",
                                }}>
                                    {personas.map(persona => {
                                        return (
                                            <div style={{ height: "32px", width: "32px" }}>
                                                <Persona
                                                    {...persona}
                                                    size={PersonaSize.size32}
                                                    hidePersonaDetails={true}
                                                    imageAlt={persona.text}
                                                    key={persona.text}
                                                />
                                            </div>
                                        )
                                    })}</div>
                            </div>
                            : <span></span>
                        }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {(project.backlogItems) ?
                            <div className="card-info card-team">
                                <p><b>Progress</b></p>
                                <div className="card-backlog">
                                    <p>{project.backlogItems} items left in the backlog</p>
                                </div>

                                <div className="card-progressBar">
                                    <span style={{ width: project.progress + "%" }}></span>
                                </div>
                            </div>
                            : <span></span>
                        }
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {(project.description) ?
                            <div className="card-info card-description">
                                <p><b>Description</b></p>
                                <p>{project.description}</p>
                            </div>
                            : <span></span>
                        }
                    </Typography>
                </CardContent>
            </Card >
            {/* <div className="card">
            <div className="header">
                <div className="header-title">{project.title}</div>
                <div className="header-menu"></div>
            </div>
            <div className="container">
                {(project.team.length !== 0) ?
                    <div className="card-info card-team">
                        <p><b>Team</b></p>
                        {personas.map(persona => {
                            return (
                                <Persona
                                    {...persona}
                                    size={PersonaSize.size32}
                                    hidePersonaDetails={true}
                                    imageAlt={persona.text}
                                    key={persona.text}
                                />
                            )
                        })}
                    </div>
                    : <span></span>
                }
                <div style={{ clear: "both" }}></div>

                {(project.backlogItems) ?
                    <div className="card-info card-team">
                        <p><b>Progress</b></p>
                        <div className="card-backlog">
                            <p>{project.backlogItems} items left in the backlog</p>
                        </div>

                        <div className="card-progressBar">
                            <span style={{ width: project.progress + "%" }}></span>
                        </div>
                    </div>
                    : <span></span>
                }

                {(project.description) ?
                    <div className="card-info card-description">
                        <p><b>Description</b></p>
                        <p>{project.description}</p>
                    </div>
                    : <span></span>
                }

            </div>
        </div> */}
        </div >
    );
};

export default ProjectCard;